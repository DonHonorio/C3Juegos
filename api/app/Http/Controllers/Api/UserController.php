<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function devolverError($campo, $error){
        $errores = new \stdClass();
        $errores->$campo = [$error];
        return $errores;
    }

    public function fotoPefil($id)
    {
        $user = User::findOrFail($id);
        return response()->file(public_path('perfiles') . '/' . $id . '/' . $user->fotoPerfil);
    }

    public function uploadFotoPerfil()
    {
        // Comprobamos que se haya subido un archivo
        if(!request()->hasFile('fotoPerfil')){
            return response()->json([
                'status' => false,
                'errors' => $this->devolverError('fotoPerfil', 'No se ha subido ningún archivo')
            ], 200);
        }

        // Validamos el archivo
        $validator = Validator::make(request()->all(), [
            'fotoPerfil' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 200); // Error de validación
        }

        // Guardamos el archivo
        $fotoPerfil = request()->file('fotoPerfil');
        $nombreArchivo = time().'_'.$fotoPerfil->getClientOriginalName();

        // Crear directorio con el nombre del usuario
        $usuarioDirectorio = public_path('perfiles') . '/' . auth()->user()->id;
        if (!file_exists($usuarioDirectorio)) {
            mkdir($usuarioDirectorio, 0777, true);
        }

        // Vaciar el directorio del usuario
        $files = glob($usuarioDirectorio.'/*');
        foreach($files as $file){
            if(is_file($file))
                unlink($file);
        }

        // Mover el archivo a la carpeta del usuario
        $fotoPerfil->move($usuarioDirectorio, $nombreArchivo);

        // Actualizamos el usuario
        $user = User::findOrFail(auth()->user()->id);
        $user->fotoPerfil = $nombreArchivo;
        $user->updated_at = now();
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Foto de Perfil Actualizada Correctamente',
            'user' => $user
        ], 200);
    }

    public function deleteFotoPerfil($id)
    {
        // Comprobamos que el usuario que quiere eliminar la foto de perfil es el mismo que el autenticado
        if(auth()->user()->id != $id){
            return response()->json([
                'status' => false,
                'message' => 'No puedes eliminar la foto de perfil de otro usuario'
            ], 403); // 403 -> "Forbidden"
        }

        // Actualizamos el usuario
        $user = User::findOrFail(auth()->user()->id);
        $user->fotoPerfil = null;
        $user->updated_at = now();
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Foto de Perfil Eliminada Correctamente',
            'user' => $user
        ], 200);
    }

    public function update(Request $request, $id)
    {
        // Comprobamos que el usuario que quiere actualizar es el mismo que el autenticado
        if(auth()->user()->id != $id){
            return response()->json([
                'status' => false,
                'message' => 'No puedes actualizar a otro usuario'
            ], 403); // 403 -> "Forbidden"
        }

        $camibarContrasenia = false;
        // Comprobamos si se quiere cambiar la contraseña
        if (strlen($request->old_password) > 0 && strlen($request->password) > 0) {
            // Comprobamos que la contraseña actual es correcta
            if (!Hash::check($request->old_password, auth()->user()->getAuthPassword())) {
                return response()->json([
                    'status' => false,
                    'errors' => $this->devolverError('old_password', 'La contraseña actual no coincide')
                ], 200);
            }

            // Validamos las contraseñas
            $validatorContrasenias = Validator::make($request->only('old_password', 'password','password_confirmation'), [
                'old_password' => 'required|string|min:8',
                'password' => 'required|string|min:8|confirmed',
            ]);
            if($validatorContrasenias->fails()){
                return response()->json([
                    'status' => false,
                    'errors' => $validatorContrasenias->errors()
                ], 200); // Error de validación
            }

            // Comprobamos que la nueva contraseña no sea igual a la anterior
            if ($request->old_password == $request->password) {
                return response()->json([
                    'status' => false,
                    'errors' => $this->devolverError('password', 'La nueva contraseña no puede ser igual a la anterior')
                ], 200);
            }

            // Permitimos cambiar la contraseña
            $camibarContrasenia = true;
        }

        // Validamos el resto de campos
        $validator = Validator::make($request->all(), [
            'nickname' => ['required','string','max:25','min:2','unique:users,nickname,'.auth()->user()->id],
            'email' => ['required','string','email','max:255','unique:users,email,'.auth()->user()->id],
            'name' => 'string|max:60|min:2',
            'apellidos' => 'string|max:60|min:2',
            'modulo' => 'string|max:100|min:2',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 200); // Error de validación
        }

        // Actualizamos el usuario
        $user = User::findOrFail(auth()->user()->id);
        $user->nickname = $request->nickname;
        if($camibarContrasenia) $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->apellidos = $request->apellidos;
        $user->modulo = $request->modulo;
        $user->updated_at = now();
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Usuario Actualizado Correctamente',
            'user' => $user
        ], 200);

    }

    public function destroy($id)
    {
        if(auth()->user()->id != $id){
            return response()->json([
                'status' => false,
                'message' => 'No puedes eliminar a otro usuario'
            ], 403); // 403 -> "Forbidden"
        }

        // Antes de eliminar al usuario, eliminamos su foto de perfil y su directorio
        $user = User::findOrFail(auth()->user()->id);
        if($user->fotoPerfil != null){
            $fotoPerfil = public_path('perfiles') . '/' . auth()->user()->id . '/' . $user->fotoPerfil;
            if(file_exists($fotoPerfil)){
                unlink($fotoPerfil);
            }
            rmdir(public_path('perfiles') . '/' . auth()->user()->id);
        }

        // Eliminamos el usuario
        User::destroy(auth()->user()->id);
        return response()->json([
            'status' => true,
            'message' => 'Usuario Eliminado Correctamente'
        ], 200);
    }
}
