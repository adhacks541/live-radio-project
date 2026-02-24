<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Playlist;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Log;

class StreamRadio extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'radio:stream';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manages the FFmpeg streaming process for the live radio';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting Radio Streamer...');
        
        // Endless loop to keep the station on air
        while (true) {
            $now = Carbon::now();
            
            // 1. Determine Current Playlist
            $playlist = Playlist::forDateTime($now);

            if (!$playlist) {
                $this->warn('No playlist scheduled for now. Playing fallback/silence...');
                $this->playFallback();
                sleep(5);
                continue;
            }

            // 2. Calculate "Where are we in the playlist?"
            // We need to map the current wall-clock time to a specific track and offset.
            $playlistStart = Carbon::parse($playlist->scheduled_date->format('Y-m-d') . ' ' . $playlist->start_time);
            $secondsSinceStart = $now->diffInSeconds($playlistStart); 
            
            $trackInfo = $this->getCurrentTrackInPlaylist($playlist, $secondsSinceStart);

            if (!$trackInfo) {
                $this->warn('Playlist ended or empty. Waiting for next slot.');
                sleep(5);
                continue;
            }

            $track = $trackInfo['track'];
            $offset = $trackInfo['offset']; // Start X seconds into the song
            
            $this->info("Now playing: {$track->title} (Offset: {$offset}s)");

            // 3. Update "Now Playing" Cache for API
            Cache::put('radio_current_track', [
                'title' => $track->title,
                'artist' => $track->artist,
                'album_art' => $track->album_art_url,
                'start_time' => $now->subSeconds($offset)->toIso8601String(),
                'duration' => $track->duration_seconds,
            ], 20); // Expires quickly so we refresh often

            // 4. Stream this specific track
            // Note: In a real "seamless" system, we would generate a concat playlist for the next hour
            // and feed that to FFmpeg. For this BASIC phase, we stream one file at a time or use a playlist approach.
            // A better robust approach for TRUE gapless is piping a playlist to ffmpeg via stdin.
            // However, to satisfy "Late joiners hear current live position", we must use the calculated offset.
            
            $this->streamTrack($track, $offset);
        }
    }

    private function getCurrentTrackInPlaylist($playlist, $secondsSinceStart)
    {
        $elapsed = 0;
        
        foreach ($playlist->tracks as $track) {
            $duration = $track->duration_seconds;
            
            // Is the current time inside this track?
            if ($secondsSinceStart >= $elapsed && $secondsSinceStart < ($elapsed + $duration)) {
                return [
                    'track' => $track,
                    'offset' => $secondsSinceStart - $elapsed
                ];
            }
            
            $elapsed += $duration;
        }

        return null; // Passed end of all tracks
    }

    private function streamTrack($track, $offset)
    {
        $icecastUrl = 'icecast://source:hackme_source@localhost:8000/radio';
        
        // Construct FFmpeg command to play THIS file starting at offset
        // -ss : Seek to offset
        // -re : Realtime reading (important!)
        // -i : Input file
        // ... encoding params ...
        // icecast URL
        
        // Note: 'icecast://' protocol support depends on ffmpeg compilation.
        // Often usually 'icecast://user:pass@host:port/mount'
        
        $cmd = [
            'ffmpeg',
            '-re',
            '-ss', (string)$offset,
            '-i', $track->file_path,
            '-c:a', 'libmp3lame',
            '-b:a', '128k',
            '-content_type', 'audio/mpeg',
            '-f', 'mp3',
            $icecastUrl
        ];

        // We run this blocking, because we want to wait until the song finishes 
        // (or we kill it if we need to switch). 
        // But wait! If we run blocking, we can't update metadata mid-song if needed.
        // For a basic system, blocking for the duration of one song is acceptable.
        
        $this->info("Executing FFmpeg...");
        
         Process::run($cmd, function (string $type, string $output) {
             // Echo ffmpeg output to supervisor logs for debugging
             echo $output;
         });
         
        // When process finishes (song ends), the loop continues to the next track.
    }

    private function playFallback()
    {
        // Simple fallback
        // In production, loop a specific 'station_id.mp3'
    }
}
