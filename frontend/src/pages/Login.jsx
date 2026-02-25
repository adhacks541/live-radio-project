import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-ambient-glow"></div>
            <div className="glass-panel auth-card">
                <div className="auth-header">
                    <div className="auth-icon-wrapper">
                        <LogIn size={32} className="auth-icon-main" />
                    </div>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Enter your credentials to access the studio</p>
                </div>

                {error && (
                    <div className="auth-alert error-alert animate-fade-in">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="dj@echowave.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`auth-submit-btn ${isLoading ? 'btn-loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <><Loader2 size={20} className="spin-icon" /> Authenticating...</>
                        ) : (
                            <>Login to Dashboard <ArrowRight size={18} /></>
                        )}
                    </button>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register" className="auth-link">Create one now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
