# External APIs & Dependencies

## Required Service APIs

### 1. Icecast V2
- **Port**: 8000 (TCP)
- **Role**: Audio Ingestion & Distribution
- **Endpoints**:
  - `/radio`: The public stream URL.
  - `/admin`: Administration panel (stats, kick users).

### 2. FFmpeg (CLI)
- **Role**: Transcoding & Streaming
- **Usage**: Invoked internally by Laravel/Supervisor.

## Optional / Future Enhancements (Not in Phase 1)

### 3. MusicBrainz / Discogs API
- **Usage**: Fetching high-quality Album Art if not stored locally.

### 4. S3 / Cloud Storage (AWS/MinIO)
- **Usage**: If offloading MP3 storage from the local Linux server.
- **Note**: Requires mounting via FUSE or streaming directly from URL (FFmpeg supports http inputs).

### 5. Google Drive / Dropbox API
- **Usage**: Auto-importing new tracks from a shared folder.
