<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', PortfolioController::class)->name('home');

Route::middleware(['auth', 'can:manage-projects'])->group(function () {
    Route::get('dashboard', [ProjectController::class, 'index'])->name('dashboard');
    Route::resource('projects', ProjectController::class)->only(['create', 'store', 'edit', 'update']);
});

Route::get('/debug-user', function () {
    $user = User::first();

    return [
        'exists' => (bool) $user,
        'password_prefix' => $user
            ? substr($user->password, 0, 10)
            : null,
        'password_length' => $user
            ? strlen($user->password)
            : null,
    ];
});

require __DIR__.'/settings.php';
