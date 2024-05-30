<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nickname' => 'required|string|max:25|min:2|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'email' => 'required|string|email|max:255|unique:users',
            'name' => 'string|max:60|min:2',
            'apellidos' => 'string|max:60|min:2',
            'modulo' => 'string|max:100|min:2',
        ]);

        if($validator->fails()){
            return response()->json([
                // 'Valor de nickname: '. $request->nickname,
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400); // 400 -> "Bad Request"
        }

        $user = User::create([
            'nickname' => $request->nickname,
            'password' => Hash::make($request->password),
            'email' => $request->email
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json([
                'status' => true,
                'message' => 'Usuario Creado Correctamente',
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ], 201); // 201 -> "Created"
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
                'errors' => ['Credenciales Incorrectas']
            ], 401); // 401 -> "Unauthorized"
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
                ->json([
                    'status' => true,
                    'user' => $user,
                    'token' => $token,
                    'token_type' => 'Bearer',
                    'message' => 'Sesión Iniciada Correctamente',
                ], 200); // 200 -> "OK"
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sesión Cerrada Correctamente'
        ], 204); // 204 -> "No Content"
    }

}