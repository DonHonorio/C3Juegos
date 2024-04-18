<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function __invoke()
    {
        $users = User::all();
        $games = Game::all();
        $comments = Comment::all();

        return response()->json([
            'users' => $users,
            'games' => $games,
            'comments' => $comments
        ]);
    }
}
