<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
// controllers
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\PolicyNavigatorController;
use App\Http\Controllers\UsersGroupController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::prefix('system-settings')->name('system-settings.')->group(function () {
        Route::resource('policy-navigator', PolicyNavigatorController::class)->only('index','update');
        Route::resource('company-profile', CompanyProfileController::class);
        Route::resource('user-group', UsersGroupController::class);
        Route::resource('users', UsersController::class);
    });

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('my-profile', [UsersController::class, 'myProfile'])->name('my-profile');
    });
});

require __DIR__.'/auth.php';
