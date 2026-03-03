<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SessionController;
use App\Http\Controllers\Api\ContainerController;
use App\Http\Controllers\HostController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Http\Request;

Route::middleware([CorsMiddleware::class])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'summary']);
    Route::post('/dashboard/top-up', [DashboardController::class, 'topUp']);

    // Sessions
    Route::get('/sessions/start', [SessionController::class, 'start']);
    Route::get('/sessions/{id}/stop', [SessionController::class, 'stop']);

    // Containers
    Route::get('/containers/active', [ContainerController::class, 'active']);
    Route::post('/containers/start', [ContainerController::class, 'start']);
    Route::post('/containers/{id}/stop', [ContainerController::class, 'stop']);

    // Hosts
    Route::get('/active-hosts', [HostController::class, 'activeHosts']);
    Route::get('/hosts', [HostController::class, 'index']);

    // Auth
    Route::post('/register', [AuthController::class, 'register']); // POST only
    Route::post('/login', [AuthController::class, 'login']);

    // Current user (optional)
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});