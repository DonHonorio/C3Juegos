<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function __invoke()
    {
        $users = User::all();
        $games = Game::all();
        $comments = Comment::all();

        $ranking = DB::table('games as g')
            ->selectRaw('g.id, nombreJuego, AVG(rating) as media, g.user_id, genero, historia, controles, portada, g.created_at, g.updated_at')
            ->join('ratings as r', 'r.game_id', '=', 'g.id')
            ->groupBy('g.id')
            ->orderBy('media', 'desc')
            ->limit(5)
            ->get();

        $rankingWithRowNumber = $ranking->map(function ($game, $index) {
            $game->posicion = $index + 1;
            return $game;
        });

        return response()->json([
            'status' => true,
            'users' => $users,
            'games' => $games,
            'comments' => $comments,
            'ranking' => $rankingWithRowNumber
        ]);
    }
}
