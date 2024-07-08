import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import usePasswordReset from '../../hooks/pages/usePasswordReset';
import PageTitle from '../../components/PageTitle';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function RequestReset() {
    const { loading, requestResetLink, requestValidationSchema, initialValuesRequest } = usePasswordReset();

    return (
        <>
            <PageTitle title="Solicitar Redefinição de Senha" />
            <Formik
                initialValues={initialValuesRequest}
                validationSchema={requestValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    requestResetLink(values.email);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field as="input" type="email" name="email" id="email" className="form-control" placeholder="Digite seu e-mail" />
                            <ErrorMessage name="email" className="text-danger" component="div" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading || isSubmitting}>
                            {loading ? <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : 'Enviar Link de Redefinição'}
                        </button>
                        <div className="mt-3">
                            <p>
                                Voltar para o <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default RequestReset;
