import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import usePasswordReset from '../../hooks/pages/usePasswordReset';
import PageTitle from '../../components/PageTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResetPassword() {
    const { token } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const email = queryParams.get('email');

    const {
        resetPassword,
        loading,
        resetValidationSchema,
        initialValuesReset
    } = usePasswordReset(email, token);

    return (
        <>
            <PageTitle title="Redefinir Senha" />
            <Formik
                initialValues={{ ...initialValuesReset, email, token }}
                validationSchema={resetValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    resetPassword(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Nova Senha</label>
                            <Field as="input" type="password" name="password" id="password" className="form-control" placeholder="Digite a nova senha" />
                            <ErrorMessage name="password" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordConfirmation" className="form-label">Confirme a Nova Senha</label>
                            <Field as="input" type="password" name="passwordConfirmation" id="passwordConfirmation" className="form-control" placeholder="Confirme a nova senha" />
                            <ErrorMessage name="passwordConfirmation" className="text-danger" component="div" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading || isSubmitting}>
                            {loading ? <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : 'Redefinir Senha'}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ResetPassword;
