<?php

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
    Route::post('/game', 'store');
    Route::get('/game/{id}', 'show');
    Route::put('/game/{id}', 'update');
    Route::put('/game/{id}', 'update');
    Route::patch('/game/{id}', 'updatePartial');
    Route::delete('/game/{id}', 'destroy');
});

