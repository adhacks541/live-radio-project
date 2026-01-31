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
        <div className="schedule-card">
            <h3>Coming Up</h3>
            {schedule.length === 0 ? (
                <p>No upcoming shows scheduled.</p>
            ) : (
                <ul className="schedule-list">
                    {schedule.map(item => (
                        <li key={item.id}>
                            <span className="time">{item.start_time.substring(0, 5)}</span>
                            <span className="name">{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            <style>{`
                .schedule-card {
                    margin-top: 2rem;
                    background: #333;
                    color: #eee;
                    padding: 1rem;
                    border-radius: 8px;
                }
                .schedule-list {
                    list-style: none;
                    padding: 0;
                    text-align: left;
                }
                .schedule-list li {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #444;
                }
                .time {
                    font-weight: bold;
                    color: #e91e63;
                }
            `}</style>
        </div>
    );
};

export default ScheduleView;
