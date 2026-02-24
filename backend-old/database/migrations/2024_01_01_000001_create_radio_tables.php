<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('filename'); // e.g., "song.mp3"
            $table->string('file_path'); // absolute path
            $table->integer('duration_seconds');
            $table->string('artist')->nullable();
            $table->string('title')->nullable();
            $table->string('album_art_url')->nullable(); // Local or URL
            $table->timestamps();
        });

        Schema::create('playlists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('scheduled_date'); // Date this playlist is for
            $table->time('start_time'); // e.g., '14:00:00'
            $table->time('end_time');   // e.g., '16:00:00'
            $table->timestamps();

            // Prevent overlap in logic, enforce via unique constraints if desired
            $table->index(['scheduled_date', 'start_time']);
        });

        Schema::create('playlist_track', function (Blueprint $table) {
            $table->id();
            $table->foreignId('playlist_id')->constrained()->cascadeOnDelete();
            $table->foreignId('track_id')->constrained()->cascadeOnDelete();
            $table->integer('sort_order'); // 1, 2, 3...
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('playlist_track');
        Schema::dropIfExists('playlists');
        Schema::dropIfExists('tracks');
    }
};
