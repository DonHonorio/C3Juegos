<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    
    public function index()
    {
        $games = Game::all();
        return response()->json($games);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombreJuego' => 'required|string|max:60|min:2|unique:games',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        $game = new Game();
        $game->user_id = auth()->user()->id;
        $game->nombreJuego = $request->nombreJuego;
        $game->genero = $request->genero;
        $game->historia = $request->historia;
        $game->controles = $request->controles;
        $game->portada = $request->portada;
        $game->save();

        return response()->json([
            'status' => true,
            'message' => 'Juego Creado Correctamente'
        ], 201);
    }
    
    public function show($id)
    {
        $game = Game::findOrFail($id);

        return response()->json([
            'status' => true,
            'game' => $game
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombreJuego' => 'required|string|max:60|min:2|unique:games',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        $game = Game::findOrFail($id);
        $game->nombreJuego = $request->nombreJuego;
        $game->genero = $request->genero;
        $game->historia = $request->historia;
        $game->controles = $request->controles;
        $game->portada = $request->portada;
        $game->save();

        return response()->json([
            'status' => true,
            'message' => 'Juego Actualizado Correctamente'
        ], 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombreJuego' => 'required|string|max:60|min:2|unique:games',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        $game = Game::findOrFail($id);
    
        $game->update($request->only('nombreJuego', 'genero', 'historia', 'controles', 'portada'));
    
        return response()->json([
            'status' => true,
            'message' => 'Juego Actualizado Correctamente'
        ], 200);
    }
    
    public function destroy($id)
    {
        $game = Game::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'Juego Eliminado Correctamente'
        ], 200);
    }

    public function favoritos()
    {
        // Devuelve los juegos favoritos del usuario autenticado
        $games = DB::table('games as g')
            ->selectRaw('g.id, g.user_id as creador, nombreJuego, genero, historia, controles, portada, g.created_at, g.updated_at')
            ->join('likes as l', 'l.game_id', '=', 'g.id')
            ->where('l.user_id', auth()->user()->id)
            ->get();

        // gamesFavHome son los juegos favoritos para la vista Home del frontend y gamesFavTodos para la vista detallada con todos los juegos favoritos
        $gamesFavHome = [];
        $gamesFavTodos = [];

        if ($games->isEmpty()) {
            $status = false;
        } else {
            $status = true;
            $gamesFavHome = $games->take(4);
            $gamesFavTodos = $games;
        }

        return response()->json([
            'status' => $status,
            'gamesFavHome' => $gamesFavHome,
            'gamesFavTodos' => $gamesFavTodos
        ]);
    }

    public function likesGames()
    {
        // Devuelve un array con los todos los likes de cada juego (y quien los ha dado)
        $games = Game::all();
        $likesGames = [];
        
        foreach ($games as $game) {
            $likesGames[$game->id] = $game->likes;
        }

        return response()->json([
            'status' => true,
            'likesGames' => $likesGames
        ]);

    }

    public function cantidadLikesGame($id)
    {
        // Devuelve la cantiad de likes de un juego
        $game = Game::find($id);
        $cantidadLikes = $game->likes()->count();

        return response()->json([
            'status' => true,
            'cantidadLikes' => $cantidadLikes
        ]);
    }

    public function avgRatings()
    {
        // Devuelve un array con la media de las valoraciones de cada juego
        $games = Game::all();
        $avgRatings = [];
        
        foreach ($games as $game) {
            $avgRatings[$game->id] = $game->mediaRating();
        }

        return response()->json([
            'status' => true,
            'avgRatings' => $avgRatings
        ]);

    }

    public function ratingsGame($id)
    {
        // Devuelve un array con todas las valoraciones de cada juego
        $games = Game::all();
        $ratingsGames = [];

        foreach ($games as $game) {
            if ($game->ratings->isNotEmpty()) {
                $ratingsGames[$game->id] = $game->ratings;
            }
        }

        return response()->json([
            'status' => true,
            'ratingsGames' => $ratingsGames
        ]);

    }

    public function commentsGames()
    {
        // Devuelve un array con todos los comentarios de cada juego
        $games = Game::all();
        $commentsGames = [];

        foreach ($games as $game) {
            $commentsGames[$game->id] = $game->comments;
        }

        return response()->json([
            'status' => true,
            'commentsGames' => $commentsGames
        ]);
    }
}