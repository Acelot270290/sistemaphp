import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { setHideLoading, setShowLoading, setUser } from "../../reducers";
import { showMessage, showResponseError } from "../../helpers";
import * as Yup from "yup";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading.show);

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      dispatch(setShowLoading());
      const { data } = await api.post("/login", { email, password });

      dispatch(setUser(data.data));
      dispatch(setHideLoading());
      navigate("/");
    } catch (error) {
      dispatch(setHideLoading());
      showResponseError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    loading,
    onSubmit,
  };
}
