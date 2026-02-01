import React, { useState, useEffect, useRef } from 'react';

const RadioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    // Configuration
    const STREAM_URL = 'http://localhost:8000/radio';
    const API_URL = 'http://localhost:8000/api/live-track';

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.src = STREAM_URL;
            audioRef.current.load();
            audioRef.current.play()
                .catch(e => setError("Stream connection failed."));
        }
        setIsPlaying(!isPlaying);
    };

    const fetchMetadata = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.status === 'live') {
                setMetadata(data.track);
            } else {
                setMetadata(null);
            }
        } catch (err) {
            console.error("Failed fetch", err);
        }
    };

    useEffect(() => {
        fetchMetadata();
        const interval = setInterval(fetchMetadata, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="player-card glass-panel">

            <div className={`visualizer ${isPlaying ? 'active' : ''}`}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <div className="album-art-container">
                <div className={`vinyl ${isPlaying ? 'spinning' : ''}`}>
                    <img
                        src={metadata?.album_art || 'https://via.placeholder.com/300/111/FFF?text=NO+SIGNAL'}
                        alt="Album Art"
                    />
                    <div className="vinyl-shine"></div>
                </div>
            </div>

            <div className="track-info">
                <h2 className="title">{metadata?.title || 'Waiting for signal...'}</h2>
                <h3 className="artist">{metadata?.artist || 'ECHO WAVE RADIO'}</h3>
            </div>

            <div className="controls">
                <button onClick={togglePlay} className={`play-fab ${isPlaying ? 'playing' : ''}`}>
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    )}
                </button>
            </div>

            {error && <div className="error-toast">{error}</div>}
            <audio ref={audioRef} onError={() => setIsPlaying(false)} />

            <style>{`
        .glass-panel {
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .player-card {
           text-align: center;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        /* Vinyl Animation */
        .album-art-container {
          position: relative;
          width: 280px;
          height: 280px;
          margin-bottom: 2rem;
        }

        .vinyl {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          position: relative;
          border: 8px solid #111;
          transition: transform 1s ease;
        }

        .vinyl img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vinyl.spinning {
          animation: spin 10s linear infinite;
        }

        .vinyl-shine {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Text */
        .track-info {
          margin-bottom: 2rem;
        }

        .title {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .artist {
          font-size: 1.1rem;
          color: var(--color-accent);
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Play Button (FAB) */
        .play-fab {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(255, 0, 204, 0.4);
          transition: all 0.3s ease;
        }

        .play-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 30px rgba(255, 0, 204, 0.6);
        }
        
        .play-fab.playing {
           background: transparent;
           border: 2px solid var(--color-accent);
           box-shadow: 0 0 15px var(--color-accent);
           color: var(--color-accent);
           transform: scale(0.9);
        }

        /* Visualizer */
        .visualizer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 100%;
          pointer-events: none;
          opacity: 0.1;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 5px;
          padding-bottom: 0px;
          z-index: 0;
        }
        
        .visualizer .bar {
          width: 20px;
          background: var(--color-primary);
          height: 10px;
          border-radius: 5px 5px 0 0;
          transition: height 0.1s ease;
        }

        .visualizer.active .bar {
          animation: dance 0.5s infinite alternate;
        }

        .visualizer .bar:nth-child(1) { animation-delay: 0s; }
        .visualizer .bar:nth-child(2) { animation-delay: 0.2s; }
        .visualizer .bar:nth-child(3) { animation-delay: 0.4s; }
        .visualizer .bar:nth-child(4) { animation-delay: 0.1s; }
        .visualizer .bar:nth-child(5) { animation-delay: 0.3s; }

        @keyframes dance {
           0% { height: 10%; }
           100% { height: 60%; }
        }

        .error-toast {
           background: #ff3333;
           color: white;
           padding: 10px;
           border-radius: 8px;
           margin-top: 1rem;
           font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
};

export default RadioPlayer;
