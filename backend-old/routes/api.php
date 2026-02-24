<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RadioController;

Route::get('/live-track', [RadioController::class, 'liveTrack']);
Route::get('/upcoming-playlists', [RadioController::class, 'upcomingPlaylists']);
