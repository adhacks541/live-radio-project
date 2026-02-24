import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-panel auth-panel">
                <div className="auth-header">
                    <LogIn size={40} className="auth-icon" />
                    <h2>Welcome Back</h2>
                    <p>Login to your account or <Link to="/register">register</Link></p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="glass-btn primary-btn btn-full">Login</button>
                </form>
            </div>
            <style>{`
                .auth-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 70vh;
                }
                .auth-panel {
                    padding: 3rem;
                    width: 100%;
                    max-width: 450px;
                }
                .auth-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .auth-icon {
                    color: var(--color-accent);
                    margin-bottom: 1rem;
                }
                .error-message {
                    background: rgba(255, 0, 85, 0.2);
                    border: 1px solid #ff0055;
                    border-radius: 8px;
                    padding: 10px;
                    margin-bottom: 1rem;
                    text-align: center;
                    color: white;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                }
                .form-group input {
                    width: 100%;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    color: white;
                    font-family: var(--font-main);
                }
                .form-group input:focus {
                    outline: none;
                    border-color: var(--color-accent);
                }
                .btn-full {
                    width: 100%;
                    justify-content: center;
                    margin-top: 1rem;
                }
            `}</style>
        </div>
    );
};

export default Login;
