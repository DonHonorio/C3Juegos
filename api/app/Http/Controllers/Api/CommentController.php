<?php

namespace App\Http\Controllers\Api;

use App\Models\Rating;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index()
    {
        //
    }

    // Los comentarios y las valoraciones se tienen que crear a la vez, 
    // y si fallan, no se tiene que crear ninguna
    public function storeWithRating(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comentario' => 'required|string|min:2',
            'game_id' => 'required|integer|exists:games,id',
            //valen los rating decimales
            'valoracion' => 'required|numeric|min:0.5|max:5',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        // un usuario no puede valorar un juego dos veces
        Rating::updateOrCreate(
            ['user_id' => auth()->user()->id, 'game_id' => $request->game_id],
            ['rating' => $request->valoracion] 
        );

        $comment = new Comment();
        $comment->user_id = auth()->user()->id;
        $comment->game_id = $request->game_id;
        $comment->comment = $request->comentario;
        $comment->save();

        return response()->json([
            'status' => true,
            'message' => 'Comentario y Valoraciones Creados Correctamente'
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

    public function destroy($id)
    {
        //
    }
}
