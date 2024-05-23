<?php

namespace App\Http\Controllers\Api;

use App\Models\Rating;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{

    public function index()
    {
        //
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|number|min:1|max:5',
            'game_id' => 'required|integer|exists:games,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        $rating = new Rating();
        $rating->user_id = auth()->user()->id;
        $rating->game_id = $request->game_id;
        $rating->rating = $request->rating;
        $rating->save();

        return response()->json([
            'status' => true,
            'message' => 'Rating Creado Correctamente'
        ], 201);
    }

    public function updateOrCreateRating(Request $request)
    {
        $validator = Validator::make($request->all(), [
            //valen los rating decimales
            'rating' => 'required|numeric|min:0.5|max:5',
            'game_id' => 'required|integer|exists:games,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        Rating::updateOrCreate(
            ['user_id' => auth()->user()->id, 'game_id' => $request->game_id],  // columnas a buscar
            ['rating' => $request->rating]  // columnas a actualizar o crear
        );

        return response()->json([
            'status' => true,
            'message' => 'Rating Creado o Actualizado Correctamente'
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
