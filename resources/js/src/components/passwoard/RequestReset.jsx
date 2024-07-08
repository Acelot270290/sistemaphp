import React from 'react';


function RequestReset({ email, setEmail, requestResetLink, loading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        requestResetLink();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? <spinner as="span" animation="border" size="sm" /> : "Enviar Link de Redefinição"}
            </button>
        </form>
    );
}

export default RequestReset;
