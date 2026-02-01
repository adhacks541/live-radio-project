import React, { useState, useEffect } from 'react';

const ScheduleView = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/upcoming-playlists')
            .then(res => res.json())
            .then(data => setSchedule(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="schedule-panel glass-panel">
            <h3 className="section-title">UPCOMING SHOWS</h3>

            {schedule.length === 0 ? (
                <div className="empty-state">
                    <p>NO FUTURE TRANSMISSIONS DETECTED</p>
                </div>
            ) : (
                <div className="timeline">
                    {schedule.map((item, index) => (
                        <div key={item.id} className={`timeline-item ${index === 0 ? 'next' : ''}`}>
                            <div className="time-col">
                                <span className="time">{item.start_time.substring(0, 5)}</span>
                                <div className="line"></div>
                            </div>
                            <div className="content-col">
                                <span className="date-badge">
                                    {new Date(item.scheduled_date).toLocaleDateString(undefined, { weekday: 'short' })}
                                </span>
                                <h4 className="show-name">{item.name}</h4>
                                <span className="duration">2 hours</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .schedule-panel {
                    border-radius: 16px; 
                    /* glass styles inherited from index.css class .glass-panel if applied, 
                       but since CSS modules aren't used, we re-apply or rely on global class */
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    padding: 1.5rem;
                    border: 1px solid var(--glass-border);
                }

                .section-title {
                    font-family: var(--font-mono);
                    color: var(--color-text-muted);
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 0.5rem;
                }

                .timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .timeline-item {
                    display: flex;
                    gap: 1rem;
                    position: relative;
                }

                /* Time Column */
                .time-col {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 60px;
                }

                .time {
                    font-family: var(--font-mono);
                    font-weight: bold;
                    color: var(--color-accent);
                    background: rgba(0, 212, 255, 0.1);
                    padding: 4px 6px;
                    border-radius: 4px;
                    font-size: 0.9rem;
                }

                .line {
                    width: 2px;
                    flex-grow: 1;
                    background: var(--glass-border);
                    margin-top: 8px;
                    min-height: 20px;
                }
                
                .timeline-item:last-child .line {
                    display: none;
                }

                /* Content Column */
                .content-col {
                    flex-grow: 1;
                    padding-bottom: 1rem;
                }

                .date-badge {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: var(--color-text-muted);
                    letter-spacing: 1px;
                }

                .show-name {
                    font-size: 1.1rem;
                    margin: 4px 0;
                    color: white;
                }

                .duration {
                    font-size: 0.8rem;
                    color: var(--color-text-muted);
                }

                /* Next Up Highlight */
                .timeline-item.next .show-name {
                    color: var(--color-primary);
                    text-shadow: 0 0 10px rgba(255, 0, 204, 0.3);
                }
                
                .timeline-item.next .time {
                    background: var(--color-primary);
                    color: white;
                    box-shadow: 0 0 10px var(--color-primary);
                }

                .empty-state {
                    text-align: center;
                    padding: 2rem;
                    opacity: 0.5;
                    font-family: var(--font-mono);
                }
            `}</style>
        </div>
    );
};

export default ScheduleView;
