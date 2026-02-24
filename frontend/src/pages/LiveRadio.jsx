import React from 'react';
import RadioPlayer from '../components/RadioPlayer';
import ScheduleView from '../components/ScheduleView';

const LiveRadio = () => {
    return (
        <div className="main-content">
            <RadioPlayer />
            <ScheduleView />
        </div>
    );
};

export default LiveRadio;
