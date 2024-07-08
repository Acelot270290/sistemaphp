import React from 'react';


function ResetPassword({ token, setToken, email, password, setPassword, passwordConfirmation, setPasswordConfirmation, resetPassword, loading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="token" className="form-label">Token:</label>
                <input
                    type="text"
                    className="form-control"
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordConfirmation" className="form-label">Confirm New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Reset Password"}
            </button>
        </form>
    );
}

export default ResetPassword;
