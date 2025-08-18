import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../utils/auth';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            setMessage('A reset link has been sent to your email.');
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="reset-password">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;