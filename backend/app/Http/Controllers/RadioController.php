<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Playlist;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class RadioController extends Controller
{
    /**
     * Get the currently playing track metadata.
     */
    public function liveTrack()
    {
        $current = Cache::get('radio_current_track');

        if (!$current) {
            return response()->json([
                'status' => 'offline',
                'message' => 'Stream is currently offline or playing fallback.'
            ]);
        }

        // Calculate time remaining based on cached start time
        $start = Carbon::parse($current['start_time']);
        $now = Carbon::now();
        $elapsed = $now->diffInSeconds($start);
        $remaining = max(0, $current['duration'] - $elapsed);

        return response()->json([
            'status' => 'live',
            'track' => $current,
            'server_time' => $now->toIso8601String(),
            'computed' => [
                'elapsed_seconds' => $elapsed,
                'remaining_seconds' => $remaining
            ]
        ]);
    }

    /**
     * Get the upcoming playlist schedule.
     */
    public function upcomingPlaylists()
    {
        $now = Carbon::now();
        
        $playlists = Playlist::where('scheduled_date', '>=', $now->toDateString())
            ->where(function($query) use ($now) {
                $query->where('scheduled_date', '>', $now->toDateString())
                      ->orWhere('end_time', '>', $now->toTimeString());
            })
            ->orderBy('scheduled_date')
            ->orderBy('start_time')
            ->take(5)
            ->get();

        return response()->json($playlists);
    }
}
