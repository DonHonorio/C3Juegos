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
            'nickname' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'email' => 'required|string|email|max:255|unique:users'
        ]);

        if($validator->fails()){
            return response()->json([
                // 'Valor de nickname: '. $request->nickname,
                // 'Valor de password: '. $request->password,
                // 'Valor de email: '. $request->email,
                $validator->errors()
            ]);
        }

        $user = User::create([
            'nickname' => $request->nickname,
            'password' => Hash::make($request->password),
            'email' => $request->email
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json([
                'user' => $user,
                'accessToken' => $token,
                'token_type' => 'Bearer',
            ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json([
                // 'Valor de password: '. $request->password,
                // 'Valor de email: '. $request->email,
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
                ->json([
                    'user' => $user,
                    'accessToken' => $token,
                    'token_type' => 'Bearer',
                    'message' => 'Buenas ', $user->nickname,
                ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            // 'Valor método tokens(): ',
            // auth()->user()->tokens(),
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

}
