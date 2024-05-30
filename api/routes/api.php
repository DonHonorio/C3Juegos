<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/home', HomeController::class)->name('home');

Route::controller(GameController::class)->group(function () {
    Route::get('/games', 'index');
    Route::get('/game/{id}/creador', 'creador');
    Route::get('/game/{id}/ratingsGame', 'ratingsGame');
    Route::get('/game/{id}/commentsGame', 'commentsGame');
    Route::get('/game/{id}', 'show');
    Route::get('/games/likesGames', 'likesGames');
    Route::get('/games/commentsGames', 'commentsGames');
    Route::get('/games/cantidadLikesGame/{id}', 'cantidadLikesGame');
    Route::get('/games/avgRatings', 'avgRatings');
});

Route::get('/user/fotoPerfil/{id}', [UserController::class, 'fotoPefil']);

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/logout', [AuthController::class, 'logout']);

    Route::controller(UserController::class)->group(function () {
        Route::post('/uploadFotoPerfil', 'uploadFotoPerfil');
        Route::delete('/user/deleteFotoPerfil/{id}', 'deleteFotoPerfil');
        Route::put('/user/{id}', 'update');
        Route::delete('/user/{id}', 'destroy');
    });
    
    Route::controller(GameController::class)->group(function () {
        Route::post('/game', 'store');
        Route::put('/game/{id}', 'update');
        Route::patch('/game/{id}', 'updatePartial');
        Route::delete('/game/{id}', 'destroy');
        Route::get('/game/{id}/checkLike', 'checkLike');

        Route::get('/games/checkLikes', 'checkLikes');
        Route::get('/games/favoritos', 'favoritos');
    });

    Route::controller((LikeController::class))->group(function () {
        Route::post('/like/{game_id}', 'store');
        Route::delete('/like/{game_id}', 'destroy');
    });

    Route::post('/comment', [CommentController::class, 'storeWithRating']);
});