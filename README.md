# Live Radio Streaming System

A production-ready, scheduling-first live radio system built with **Laravel** (Backend), **React** (Frontend), **Icecast** (Streaming), and **FFmpeg**.

## Overview
This system enables a 24/7 radio broadcast where all listeners hear the same audio simultaneously. It uses a server-side scheduler to strictly manage what tracks play at specific times, ensuring a unified "broadcast" experience rather than on-demand playback.

## Features
-   **Audio Broadcasting**: Uses Icecast + FFmpeg for continuous streaming.
-   **Strict Scheduling**: Laravel Scheduler determines the playlist based on time-of-day.
-   **Live Metadata**: Real-time "Now Playing" updates via API polling.
-   **Gapless-style Playback**: Backend manages track offsets for late joiners.
-   **Auto-Recovery**: Supervisor keeps the stream alive and restarts it on failure.

## Tech Stack
-   **Backend**: Laravel 10+ (PHP 8.2)
-   **Frontend**: React.js (Vite/CRA)
-   **Streaming**: Icecast 2.4, FFmpeg 6.0
-   **Database**: MySQL / MariaDB
-   **OS**: Linux (Ubuntu/Debian recommended)

## Project Structure
-   `/backend` - Laravel API & Scheduler logic.
-   `/frontend` - React Audio Player & Schedule UI.
-   `/config` - Server configurations (Icecast, Supervisor).
-   `/scripts` - Helper scripts for streaming.
-   `/docs` - Architecture validation and failure handling docs.

## Quick Start
See [walkthrough.md](walkthrough.md) (or the generated walkthrough artifact) for detailed deployment instructions.

### 1. Requirements
Ensure `ffmpeg`, `icecast2`, `php`, `composer`, `node`, and `supervisor` are installed.

### 2. Run Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan migrate
php artisan key:generate
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Start Streaming
Enable the Supervisor config provided in `config/radio-worker.conf` to start the background worker.

## License
MIT
