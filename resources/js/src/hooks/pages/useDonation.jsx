import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import api from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { setHideLoading, setShowLoading } from "../../reducers";
import { showMessage, showResponseError } from "../../helpers";

export function useDonation() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const loading = useAppSelector((state) => state.loading.show);

  const [showQRCode, setShowQRCode] = useState(false);
  const [userSlug, setUserSlug] = useState(slug || userData?.slug);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (userSlug) {
      checkUserBySlug(userSlug);
    }
  }, [userSlug]);

  const checkUserBySlug = async (slug) => {
    try {
      const { data } = await api.get(`/user-by-slug/${slug}`);

      if (data?.slug) {
        setUserSlug(data?.slug);
      }
    } catch (error) {
      showResponseError(error);
      setUserSlug(false);
    }
  };

  const validateFields = (values) => {
    if (values.message.length > 50) {
      showMessage("Mensagem deve ter no máximo 50 caracteres", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!validateFields(values)) {
      setSubmitting(false);
      return;
    }

    dispatch(setShowLoading());

    try {
      const paymentData = {
        name: values.name,
        email: values.email,
        document: values.cpf.replace(/\D/g, ""),
        amount: parseFloat(values.amount),
        currency: values.currency,
        message: values.message,
        slug: userSlug,
      };

      const { data } = await api.post(`/payment`, paymentData);

      setTransactionId(data?.data.id);

      setQrCodeUrl(data?.data.pix.qrcode);
      setShowQRCode(true);
      showMessage(
        "QrCode Gerado com Sucesso! Aguardando o pagamento para enviar a doação.",
        "success"
      );
      resetForm();
    } catch (error) {
      showResponseError(error);
    } finally {
      dispatch(setHideLoading());
    }
  };

  const getCallbackData = ({ data }) => {
    if (data && data?.id) {
      const status =
        data?.status === "paid" && data?.payment_status === "paid"
          ? "success"
          : "error";
      const message =
        data?.status === "paid" && data?.payment_status === "paid"
          ? "Doação enviada com sucesso!"
          : "Não foi possível processar seu pagamento, tente novamente mais tarde.";
      showMessage(message, status);
    } else {
      showMessage(
        "Não foi possível processar seu pagamento, tente novamente mais tarde.",
        "error"
      );
    }

    setQrCodeUrl(null);
    setShowQRCode(false);
    setTransactionId(null);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório"),
    amount: Yup.number()
      .positive("Valor deve ser positivo")
      .required("Valor é obrigatório"),
    message: Yup.string()
      .max(50, "Mensagem deve ter no máximo 50 caracteres")
      .required("Mensagem é obrigatória"),
    currency: Yup.string().required("Moeda é obrigatória"),
  });

  return {
    loading,
    showQRCode,
    qrCodeUrl,
    handleSubmit,
    validationSchema,
    userSlug,
    transactionId,
    getCallbackData,
  };
}
