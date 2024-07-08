import { useNavigate } from "react-router-dom";
import api from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { setHideLoading, setShowLoading, setUser } from "../../reducers";
import { showMessage, showResponseError } from "../../helpers";
import * as Yup from 'yup';

export function useRegister() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading.show);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    user: Yup.string().required('O apelido é obrigatório'),
    email: Yup.string().email('O email não é válido').required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem coincidir').required('Confirmar a senha é obrigatório')
  });

  const initialValues = {
    name: '',
    user: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const { name, user, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      showMessage("As senhas não coincidem!", "error", "Erro");
      setSubmitting(false);
      return;
    }

    try {
      dispatch(setShowLoading());
      await api.post("/register", { name, user, email, password });
      dispatch(setUser({ name, email }));
      navigate("/login");
      showMessage("Cadastro realizado com sucesso!", "success");
    } catch (error) {
      showResponseError(error);
    } finally {
      dispatch(setHideLoading());
      setSubmitting(false);
    }
  };

  return {
    loading,
    onSubmit,
    initialValues,
    validationSchema,
  };
}
