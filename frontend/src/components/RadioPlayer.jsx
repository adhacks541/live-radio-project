import React, { useState, useEffect, useRef } from 'react';

const RadioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    // Configuration
    const STREAM_URL = 'http://localhost:8000/radio'; // Icecast mount point
    const API_URL = 'http://localhost:8000/api/live-track'; // Laravel API

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Reload source to ensure we join "live" and not buffered stale audio
            audioRef.current.src = STREAM_URL;
            audioRef.current.load();
            audioRef.current.play()
                .catch(e => setError("Stream connection failed. Is the server running?"));
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
            console.error("Failed to fetch metadata", err);
        }
    };

    // Poll for metadata every 10 seconds
    useEffect(() => {
        fetchMetadata();
        const interval = setInterval(fetchMetadata, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="radio-player-card">
            <div className="album-art">
                <img
                    src={metadata?.album_art || 'https://via.placeholder.com/300?text=No+Art'}
                    alt="Album Art"
                    className={isPlaying ? "rotating" : ""}
                />
            </div>

            <div className="track-info">
                <h2>{metadata?.title || 'Waiting for stream...'}</h2>
                <h3>{metadata?.artist || 'Live Radio'}</h3>
            </div>

            <div className="controls">
                <button onClick={togglePlay} className={`play-btn ${isPlaying ? 'active' : ''}`}>
                    {isPlaying ? 'STOP' : 'PLAY LIVE'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <audio ref={audioRef} onError={() => setIsPlaying(false)} />

            <style>{`
        .radio-player-card {
           background: #222;
           color: #fff;
           padding: 2rem;
           border-radius: 12px;
           text-align: center;
           max-width: 400px;
           margin: 0 auto;
        }
        .album-art img {
           width: 100%;
           border-radius: 8px;
           margin-bottom: 1rem;
        }
        .play-btn {
           background: #e91e63;
           color: white;
           border: none;
           padding: 10px 30px;
           font-size: 1.2rem;
           border-radius: 50px;
           cursor: pointer;
           margin-top: 1rem;
        }
        .play-btn:hover {
           background: #c2185b;
        }
      `}</style>
        </div>
    );
};

export default RadioPlayer;
