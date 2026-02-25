import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await register(name, email, password, passwordConfirmation);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please check your inputs.');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-ambient-glow" style={{ background: 'var(--color-secondary)', right: '10%' }}></div>
            <div className="glass-panel auth-card">
                <div className="auth-header">
                    <div className="auth-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(51, 51, 153, 0.2), rgba(0, 212, 255, 0.2))', boxShadow: '0 0 20px rgba(51, 51, 153, 0.3)' }}>
                        <UserPlus size={32} className="auth-icon-main" style={{ filter: 'drop-shadow(0 0 8px var(--color-secondary))' }} />
                    </div>
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join the studio to start broadcasting</p>
                </div>

                {error && (
                    <div className="auth-alert error-alert animate-fade-in">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="DJ Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

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
                                minLength={8}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Confirm Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                                disabled={isLoading}
                                minLength={8}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`auth-submit-btn ${isLoading ? 'btn-loading' : ''}`}
                        disabled={isLoading}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {isLoading ? (
                            <><Loader2 size={20} className="spin-icon" /> Creating Account...</>
                        ) : (
                            <>Complete Registration <ArrowRight size={18} /></>
                        )}
                    </button>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login" className="auth-link">Login here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
