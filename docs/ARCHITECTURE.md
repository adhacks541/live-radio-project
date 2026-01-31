# Live Radio System Architecture

## Overview
This system is a "Scheduling-First" radio broadcasting engine. It does not rely on random shuffling; instead, it strictly follows a time-based schedule managed by the Laravel database.

## Data Flow
1.  **Audio Source**: Local storage on the Linux server (`/var/www/radio/storage/app/music/`).
2.  **Scheduler (Laravel)**:
    - Runs a persistent background worker (via Supervisor).
    - Checks the Database for the *current* scheduled playlist.
    - Determines the specific track that *should* be playing right now based on Time-of-Day.
    - Passes the file path to the Streaming Process.
3.  **Streamer (FFmpeg)**:
    - Receives audio file inputs.
    - Encodes them to a continuous stream (MP3/AAC).
    - Pushes the stream to the Icecast server via TCP.
4.  **Broadcaster (Icecast)**:
    - Listens on port 8000.
    - Mounts the stream at `/radio`.
    - Handles listener connections and buffers the stream for stability.
5.  **Listeners (React Client)**:
    - Connects effectively to `http://server-ip:8000/radio`.
    - Polls `https://server-ip/api/live-track` for metadata/album art updates.

## Component Responsibilities

| Component | Responsibility | "Source of Truth" |
| :--- | :--- | :--- |
| **Laravel** | Schedule Logic, API, Admin Panel | What *should* be playing. |
| **FFmpeg** | Decoding files, Encoding stream | Audio integrity. |
| **Icecast** | Client connections, Buffering | The Live Stream itself. |
| **React** | Playback, UI display | User experience. |

## Critical Constraints
- **One Stream**: All users hear the same audio.
- **No Silence**: FFmpeg must receive a constant flow of inputs or be restarted immediately.
- **Latency**: There is unavoidable latency (10-30s) between "Real Time" and "Client Hear Time" due to buffers. The UI should synchronize metadata to the *server* time, but users might see metadata change slightly before they hear the track change.
