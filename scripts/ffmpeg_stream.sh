#!/bin/bash

# Configuration
ICECAST_URL="icecast://source:hackme_source@localhost:8000/radio"
AUDIO_SOURCE="playlist.txt" # Helper file list provided by Laravel

# Note: In a real Laravel integration, this command is often constructed dynamically
# or Laravel writes to a named pipe that FFmpeg reads from.
# For simplicity in this script, we assume 'concat' protocol from a text file.

# FFmpeg Command
# -re : Read input at native frame rate (crucial for live streaming from static files)
# -f concat : Concat format
# -safe 0 : Allow unsafe file paths in list
# -i : Input file
# -c:a libmp3lame : Audio codec
# -b:a 128k : Bitrate
# -content_type : Icecast mime type
# -f mp3 : Output format

ffmpeg \
    -re \
    -f concat \
    -safe 0 \
    -i "$AUDIO_SOURCE" \
    -c:a libmp3lame \
    -b:a 128k \
    -ac 2 \
    -ar 44100 \
    -content_type audio/mpeg \
    -f mp3 \
    "$ICECAST_URL"

# Advanced method: Standard Input (Stdin)
# Laravel pipes MP3 data directly to this script:
# cat song.mp3 | ffmpeg -re -i pipe:0 ...
