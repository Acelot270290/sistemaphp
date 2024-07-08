
import React from 'react';
import { useLocation } from 'react-router-dom';

function AuthStreamlabs() {
    const location = useLocation();
    const [code, setCode] = React.useState('');

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const extractedCode = queryParams.get('code');
        setCode(extractedCode); 
    }, [location]);

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            alert('Código copiado para a área de transferência!');
        }, (err) => {
            console.error('Erro ao copiar o código: ', err);
        });
    };

    return (
        <div>
            <h1>Autorização Recebida</h1>
            <p>O código de autorização é:</p>
            <input type="text" value={code} readOnly />
            <button onClick={copyCodeToClipboard}>Copiar Código</button>
        </div>
    );
}

export default AuthStreamlabs;
