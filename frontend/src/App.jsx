import React from 'react';
import RadioPlayer from './components/RadioPlayer';
import ScheduleView from './components/ScheduleView';
import './index.css';

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo">
                    <span className="live-badge">LIVE</span>
                    <h1>ECHO<span className="accent">WAVE</span></h1>
                </div>
                <div className="status-indicator">
                    <span className="dot"></span> ON AIR
                </div>
            </header>

            <main className="main-content">
                <RadioPlayer />
                <ScheduleView />
            </main>

            <style>{`
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .logo h1 {
          font-size: 2rem;
          letter-spacing: -1px;
        }

        .logo .accent {
          color: var(--color-accent);
        }

        .live-badge {
          background: #ff0055;
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          margin-right: 8px;
          vertical-align: middle;
        }

        .status-indicator {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-accent);
        }

        .status-indicator .dot {
          width: 8px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--color-accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }

        @media (min-width: 768px) {
          .main-content {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
      `}</style>
        </div>
    );
}

export default App;
