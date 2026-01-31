# Common Failure Cases & Handling

## 1. Dead Air (Silence)
**Symptom**: Listeners hear nothing, but connected.
**Cause**: FFmpeg process died or finished playlist.
**Recovery**:
- Supervisor should auto-restart the process.
- **Fail-safe**: Laravel Scheduler checks if stream is running every minute. If not, force restart.
- **Icecast**: Use `<fallback-mount>` in config to play a "We'll be right back" loop file if the main source disconnects.

## 2. Stream Stuttering / buffering
**Symptom**: Audio cuts in and out.
**Cause**: Network bandwidth insufficient or FFmpeg CPU usage too high.
**Fix**:
- Reduce bitrate (e.g., 128k -> 96k).
- Increase Server CPU.
- Increase Icecast `<queue-size>` (buffer).

## 3. Metadata Desync
**Symptom**: "Now Playing" shows wrong song.
**Cause**: Client-side polling drift or stream latency.
**Fix**:
- **Timestamping**: Send server-side `played_at` timestamp in API.
- Client calculates `offset = (server_time - played_at)`.
- Ideally, inject metadata INTO the Icecast stream (ICY metadata) so it arrives exactly with audio frames. (Advanced, Phase 2).

## 4. Late Joiner
**Symptom**: User joins and song starts from beginning instead of middle.
**Fix**:
- This is handled naturally by live streaming.
- **Crucial**: Do NOT serve static files via HTTP. Must serve via Icecast stream.
- If using `ffmpeg -re`, it simulates live broadcast. Late joiners tap into the *current* frame being broadcast.

## 5. File Not Found
**Symptom**: FFmpeg crashes with "No such file".
**Cause**: Scheduler selected a missing file.
**Fix**:
- Laravel must `file_exists()` check before adding to playlist.
- If missing, skip to next track immediately.
