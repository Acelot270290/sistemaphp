import { useState } from 'react';
import api from '../../services/index';
import { showMessage, showResponseError } from '../../helpers';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

function usePasswordReset() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const requestValidationSchema = Yup.object({
        email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    });

    const resetValidationSchema = Yup.object({
        password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem coincidir').required('Confirmar a senha é obrigatório')
    });

    const requestResetLink = async (email) => {
        setLoading(true);
        try {
            await api.post('/password/email', { email });
            showMessage('Link de redefinição enviado com sucesso. Verifique seu e-mail.', 'success');
            navigate('/login');
        } catch (error) {
            showResponseError(error);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async ({ email, token, password, passwordConfirmation }) => {
        setLoading(true);
        try {
            await api.post('/password/reset', {
                email,
                token,
                password,
                password_confirmation: passwordConfirmation,
            });
            showMessage('Senha redefinida com sucesso.', 'success');
            navigate('/login');
        } catch (error) {
            showResponseError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        setEmail,
        setToken,
        loading,
        requestResetLink,
        resetPassword,
        requestValidationSchema,
        resetValidationSchema,
        initialValuesRequest: { email: '' },
        initialValuesReset: { password: '', passwordConfirmation: '' },
    };
}

export default usePasswordReset;
