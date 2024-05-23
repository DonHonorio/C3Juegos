<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;
use Termwind\Components\Li;

class LikeController extends Controller
{
    
    public function index()
    {
        //
    }

    public function store($game_id)
    {
        Like::create([
            'user_id' => auth()->user()->id,
            'game_id' => $game_id
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Like Creado Correctamente'
        ], 201);
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($game_id)
    {
        $like = Like::where('user_id', auth()->user()->id)
            ->where('game_id', $game_id)
            ->first();

        $like->delete();

        return response()->json([
            'status' => true,
            'message' => 'Like Eliminado Correctamente'
        ]);
    }
}