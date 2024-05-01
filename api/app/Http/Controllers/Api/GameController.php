<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GameController extends Controller
{
    
    public function index()
    {
        // $games = Game::all();
        // return $games;

        return response()->json([
            'message' => 'Lista de juegos'
        ]);
    }
    
    public function store(Request $request)
    {
        $game = new Game();
        $game->nombreJuego = $request->nombreJuego;
        $game->genero = $request->genero;
        $game->historia = $request->historia;
        $game->controles = $request->controles;
        $game->portada = $request->portada;

        $game->save();
    }
    
    public function show($id)
    {
        $game = Game::find($id);

        return $game;
    }
    
    public function update(Request $request, $id)
    {
        $game = Game::findOrFail($id);

        $game->nombreJuego = $request->nombreJuego;
        $game->genero = $request->genero;
        $game->historia = $request->historia;
        $game->controles = $request->controles;
        $game->portada = $request->portada;

        $game->save();
        return $game;
    }

    public function updatePartial(Request $request, $id)
    {
        $game = Game::findOrFail($id);
    
        $game->update($request->only('nombreJuego', 'genero', 'historia', 'controles', 'portada'));
    
        return $game;
    }
    
    public function destroy($id)
    {
        $game = Game::destroy($id);
        return $game;
    }
}
