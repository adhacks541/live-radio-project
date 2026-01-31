import React from 'react';
import RadioPlayer from './components/RadioPlayer';
import ScheduleView from './components/ScheduleView';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>🎙️ Live Radio Station</h1>
            </header>

            <main>
                <RadioPlayer />
                <ScheduleView />
            </main>

            <style>{`
        body {
            background-color: #121212;
            font-family: system-ui, sans-serif;
            margin: 0;
            display: flex;
            justify-content: center;
            min-height: 100vh;
        }
        .App {
            width: 100%;
            max-width: 600px;
            padding: 20px;
        }
        .App-header h1 {
            color: white;
            text-align: center;
        }
      `}</style>
        </div>
    );
}

export default App;
