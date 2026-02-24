import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    // Basic protection (though route should also be protected)
    if (!user || !user.is_admin) {
        return (
            <div className="auth-container">
                <div className="glass-panel auth-panel">
                    <h2 style={{ color: '#ff0055' }}>Access Denied</h2>
                    <p>You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2>Admin Dashboard</h2>
                <p>Welcome back, Administrator {user.name}!</p>
            </div>

            <div className="main-content">
                <div className="glass-panel schedule-container">
                    <h3>System Overview</h3>
                    <ul className="schedule-list">
                        <li className="schedule-item">Total Users: 1</li>
                        <li className="schedule-item">Active Stream: Online</li>
                        <li className="schedule-item">Tracks in Library: 0</li>
                    </ul>
                </div>
                <div className="glass-panel player-container">
                    <h3>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <button className="glass-btn primary-btn">Manage Playlists</button>
                        <button className="glass-btn">Upload Tracks</button>
                        <button className="glass-btn">View Listener Logs</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
