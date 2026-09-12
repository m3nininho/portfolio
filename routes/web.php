<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', PortfolioController::class)->name('home');

Route::middleware(['auth', 'can:manage-projects'])->group(function () {
    Route::get('dashboard', [ProjectController::class, 'index'])->name('dashboard');
    Route::resource('projects', ProjectController::class)->only(['create', 'store', 'edit', 'update']);
});

use Illuminate\Support\Facades\Auth;

Route::get('/debug-auth', function () {
    return [
        'authenticated' => Auth::check(),
        'user_id' => Auth::id(),
        'session_driver' => config('session.driver'),
        'session_secure' => config('session.secure'),
        'session_domain' => config('session.domain'),
        'app_key_set' => !empty(config('app.key')),
        'app_key_length' => strlen((string) config('app.key')),
    ];
});

require __DIR__.'/settings.php';
