import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Radio, Shield, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    <span className="live-badge">LIVE</span>
                    <h1>ECHO<span className="accent">WAVE</span></h1>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="status-indicator">
                    <span className="dot"></span> ON AIR
                </div>

                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                    <Link to="/" className="glass-btn" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Radio size={16} /> Radio
                    </Link>

                    {user ? (
                        <>
                            {user.is_admin ? (
                                <Link to="/admin" className="glass-btn" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', borderColor: 'var(--color-accent)' }}>
                                    <Shield size={16} /> Admin
                                </Link>
                            ) : null}
                            <button onClick={handleLogout} className="glass-btn" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="glass-btn primary-btn" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserIcon size={16} /> Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
