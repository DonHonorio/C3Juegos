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
        $games = DB::table('games as g')
            ->selectRaw('g.user_id as creador, nombreJuego, genero, historia, controles, portada, g.created_at, g.updated_at')
            ->join('likes as l', 'l.game_id', '=', 'g.id')
            ->where('l.user_id', auth()->user()->id)
            ->get();

        if ($games->isEmpty()) {
            $status = false;
            $respuesta = 'No hay juegos favoritos';
        } else {
            $status = true;
            $respuesta = $games;
        }

        return response()->json([
            'status' => $status,
            'games' => $respuesta
        ]);
    }
}