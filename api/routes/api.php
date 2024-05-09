<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\HomeController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/home', HomeController::class)->name('home');

Route::controller(GameController::class)->group(function () {
    Route::get('/games', 'index');
    Route::get('/game/{id}', 'show');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/logout', [AuthController::class, 'logout']);
    
    Route::controller(GameController::class)->group(function () {
        Route::post('/game', 'store');
        Route::put('/game/{id}', 'update');
        Route::patch('/game/{id}', 'updatePartial');
        Route::delete('/game/{id}', 'destroy');

        Route::get('/games/favoritos', 'favoritos');
    });
});