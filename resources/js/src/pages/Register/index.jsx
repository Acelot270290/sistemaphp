import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useRegister } from "../../hooks/pages/useRegister";

export default function Register() {
    const { loading, onSubmit, initialValues, validationSchema } = useRegister();

    return (
        <>
            <PageTitle title="Cadastro" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h1 className="h3 mb-3 fw-normal">Cadastre-se</h1>
                        <div className="form-floating">
                            <Field type="text" name="name" className="form-control" id="name" placeholder="Seu Nome" />
                            <label htmlFor="name">Nome</label>
                            <ErrorMessage name="name"  component="div" className="text-danger" />
                        </div>

                        <div className="form-floating">
                            <Field type="text" name="user" className="form-control" id="user" placeholder="Apelido" />
                            <label htmlFor="user">Apelido</label>
                            <ErrorMessage name="user" component="div" className="text-danger" />
                        </div>

                        <div className="form-floating">
                            <Field type="email" name="email" className="form-control" id="email" placeholder="name@example.com" />
                            <label htmlFor="email">Endereço de Email</label>
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="form-floating">
                            <Field type="password" name="password" className="form-control" id="password" placeholder="Senha" />
                            <label htmlFor="password">Senha</label>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <div className="form-floating">
                            <Field type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirme sua Senha" />
                            <label htmlFor="confirmPassword">Confirme sua Senha</label>
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading || isSubmitting}>
                            {loading ? <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div> : "Registrar"}
                        </button>

                        <div className="mt-3">
                            <p>Já tem uma conta? <Link to="/login">Faça o Login aqui</Link>.</p>
                        </div>
                        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
                    </Form>
                )}
            </Formik>
        </>
    );
}
