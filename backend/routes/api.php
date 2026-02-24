<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RadioController;

Route::get('/live-track', [RadioController::class, 'liveTrack']);
Route::get('/upcoming-playlists', [RadioController::class, 'upcomingPlaylists']);

use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    
    // Admin only routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/stats', function () {
            return response()->json(['message' => 'Admin stats placeholder']);
        });
        // Add more admin routes here (e.g. manage playlists, tracks)
    });
});
