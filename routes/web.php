<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', PortfolioController::class)->name('home');

Route::middleware(['auth', 'can:manage-projects'])->group(function () {
    Route::get('dashboard', [ProjectController::class, 'index'])->name('dashboard');
    Route::resource('projects', ProjectController::class)->only(['create', 'store', 'edit', 'update']);
});

Route::get('/debug-php', function () {
    return [
        'php' => PHP_VERSION,
        'algos' => password_algos(),
        'bcrypt' => password_hash('teste', PASSWORD_BCRYPT),
    ];
});

require __DIR__.'/settings.php';
