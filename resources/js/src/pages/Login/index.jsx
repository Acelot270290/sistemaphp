import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLogin } from "../../hooks/pages/useLogin";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";

export default function Login() {
  const { loading, onSubmit, initialValues, validationSchema } = useLogin();

  return (
    <>
      <PageTitle title="Login" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1 className="h3 mb-3 fw-normal">Login</h1>

            <div className="form-floating">
              <Field type="email" name="email" className="form-control" id="email" placeholder="name@example.com" />
              <label htmlFor="email">Endereço de Email</label>
              <ErrorMessage name="email" className="text-danger" component="div" />
            </div>

            <div className="form-floating">
              <Field type="password" name="password" className="form-control" id="password" placeholder="Senha" />
              <label htmlFor="password">Senha</label>
              <ErrorMessage name="password" className="text-danger" component="div" />
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isSubmitting || loading}>
              {(isSubmitting || loading) ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <div className="mt-3">
              <p>
                Esqueceu sua senha? <Link to="/password/reset/request">Redefinir senha</Link>
              </p>
              <p>
                Ainda sem conta? <Link to="/register">Faça o cadastro aqui</Link>.
              </p>
            </div>
            <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
          </Form>
        )}
      </Formik>
    </>
  );
}
