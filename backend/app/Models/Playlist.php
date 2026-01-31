<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Playlist extends Model
{
    protected $guarded = [];

    protected $casts = [
        'scheduled_date' => 'date',
        // start_time and end_time stay strings or can be cast to custom time objects
    ];

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class)
            ->using(PlaylistTrack::class)
            ->withPivot('sort_order')
            ->orderByPivot('sort_order');
    }

    /**
     * Get the playlist active at a specific Datetime.
     */
    public static function forDateTime(\DateTimeInterface $dateTime): ?self
    {
        $date = $dateTime->format('Y-m-d');
        $time = $dateTime->format('H:i:s');

        return self::where('scheduled_date', $date)
            ->where('start_time', '<=', $time)
            ->where('end_time', '>', $time)
            ->first();
    }
}
