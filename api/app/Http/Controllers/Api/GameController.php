<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Helpers\ErrorHelper;
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
        // Validación de los datos del videojuego
        $validator = Validator::make($request->all(), [
            'nombreJuego' => 'required|string|max:60|min:2|unique:games',
            'genero' => 'required|in:ESTRATEGIA,SHOOT´EM UP,SHOOTER,PLATAFORMAS,RPG,DEPORTES,LUCHA',
            'historia' => 'string',
            'controles' => 'string',
            'portada' => 'string|max:100',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 200); // 400 -> "Bad Request"
        }

        // Validar si hay al menos un fichero
        if (!$request->hasFile('files')) {
            return response()->json([
                'status' => false,
                'errors' => ErrorHelper::devolverError('fichero', 'Debe haber al menos un fichero.')
            ], 200);
        }

        $todosFicheros = $request->file('files');

        // Validar si hay al menos un fichero HTML
        $faltaFicheroHTML = true;
        foreach ($todosFicheros as $fichero) {
            $extension = $fichero->getClientOriginalExtension();
            if ($extension === 'html') {
                $faltaFicheroHTML = false;
            }
        }
        if ($faltaFicheroHTML) {
            return response()->json([
                'status' => false,
                'errors' => ErrorHelper::devolverError('fichero', 'Debe adjuntar al menos un archivo HTML.')
            ], 200);
        }
    
        // Creamos el directorio del videojuego con el nombre del juego
        $directorioJuego = public_path('juegos/' . auth()->user()->id) . '/' . $request->nombreJuego;
        if (!file_exists($directorioJuego)) {
            mkdir($directorioJuego, 0777, true);
        }

        // Vaciar el directorio del usuario
        $files = glob($directorioJuego.'/*');
        foreach($files as $file){
            if(is_file($file))
                unlink($file);
        }

        // Guardamos los ficheros en el directorio del videojuego
        // Y modificamos las rutas de los ficheros (HTML, CSS, JS) del videojuego
        foreach ($todosFicheros as $fichero) {
            
            $fichero->move($directorioJuego, $fichero->getClientOriginalName());
            
            // Procedemos a modificar las rutas de los ficheros (HTML, CSS, JS) del videojuego
            $path = $directorioJuego . '/' . $fichero->getClientOriginalName();
    
            // Dependiendo de la extensión del archivo las rutas se cambiarán de diferente manera
            $extension = pathinfo($path, PATHINFO_EXTENSION);

            // nueva ruta de los ficheros del videojuego (Relativa al servidor)
            $newPath = '/juegos/' . auth()->user()->id . '/' . $request->nombreJuego . '/';
                
            try {
                if ($extension === 'html' || $extension === 'css' || $extension === 'js') {
        
                    // Lee el contenido del archivo
                    $content = file_get_contents($path);
        
                    // Hay que adaptar las rutas de los ficheros del videojuego (HTML, CSS, JS)
                    if ($extension === 'html') {
    
                        // RUTAS con src
                        // Comillas Simples
                        $srcSimpleQuotes = "/(src=')(?!http:\/\/|https:\/\/|\/\/)[^']*\/(?=[^']*')/"; // Con / en la ruta y '
                        $srcNotSlash = "/(src=')(?!http:\/\/|https:\/\/|\/\/|\/|\.)([^']*)(?=[^']*')/"; // Sin / en la ruta y '
                        if (preg_match($srcSimpleQuotes, $content) || preg_match($srcNotSlash, $content)) {
    
                            if (preg_match($srcNotSlash, $content)) { // Si la ruta no tiene / y '
                                $srcNotSlash = "/(src=')/";
                                $newUrl = "src='" . $newPath;
                                $content = preg_replace($srcNotSlash, $newUrl, $content);
                            }
    
                            $srcSimpleQuotes = "/(src=')(?!http:\/\/|https:\/\/|\/\/)[^']*\/(?=[^']*')/"; // Con / en la ruta y '   
                            if (preg_match($srcSimpleQuotes, $content)) {
                                $newUrl = "src='" . $newPath;
                                $content = preg_replace($srcSimpleQuotes, $newUrl, $content);
                            }
                        }
    
                        
                        
                        // Comillas Dobles
                        $srcNotSlash = '/(src=")(?!http:\/\/|https:\/\/|\/\/|\/|\.)([^"]*)(?=[^"]*")/'; // Sin / en la ruta y "
                        $srcDoubleQuote = '/(src=")(?!http:\/\/|https:\/\/|\/\/)[^"]*\/(?=[^"]*")/'; // Con / en la ruta y "
                        if (preg_match($srcDoubleQuote, $content) || preg_match($srcNotSlash, $content) ) {
                            
                            if (preg_match($srcNotSlash, $content)) { // Si la ruta no tiene / y "
                                $srcNotSlash = '/(src=")/';
                                $newUrl = 'src="' . $newPath;
                                $content = preg_replace($srcNotSlash, $newUrl, $content);
                            }
    
                            $srcDoubleQuotes = '/(src=")(?!http:\/\/|https:\/\/|\/\/)[^"]*\/(?=[^"]*")/'; // Con / en la ruta y "
                            if (preg_match($srcDoubleQuotes, $content) ) {
                                $newUrl = 'src="' . $newPath;
                                $content = preg_replace($srcDoubleQuotes, $newUrl, $content);
                            }
                        }
    
                        // RUTAS con href
                        // Comillas Simples
                        $hrefNotSlash = "/(href=')(?!http:\/\/|https:\/\/|\/\/|\/|\.)([^']*)(?=[^']*')/"; // Sin / en la ruta y '
                        $hrefSimpleQuotes = "/(href=')(?!http:\/\/|https:\/\/|\/\/)[^']*\/(?=[^']*')/"; // Con / en la ruta y '
                        if (preg_match($hrefSimpleQuotes, $content) || preg_match($hrefNotSlash, $content)) {
                            
                            if (preg_match($hrefNotSlash, $content)) { // Si la ruta no tiene / y '
                                $hrefNotSlash = "/(href=')/";
                                $newUrl = "href='" . $newPath;
                                $content = preg_replace($hrefNotSlash, $newUrl, $content);
                            }
    
                            if (preg_match($hrefSimpleQuotes, $content) ) { // Con / en la ruta y '
                                $newUrl = "href='" . $newPath;
                                $content = preg_replace($hrefSimpleQuotes, $newUrl, $content);
                            }
                        }
    
                        // Comillas Dobles
                        $hrefNotSlash = '/(href=")(?!http:\/\/|https:\/\/|\/\/|\/|\.)([^"]*)(?=[^"]*")/'; // Sin / en la ruta y "
                        $hrefDoubleQuotes = '/(href=")(?!http:\/\/|https:\/\/|\/\/)[^"]*\/(?=[^"]*")/'; // Con / en la ruta y "
                        if (preg_match($hrefDoubleQuotes, $content) || preg_match($hrefNotSlash, $content) ){ 
                            if (preg_match($hrefNotSlash, $content)) { // Si la ruta no tiene / y "
                                $hrefNotSlash = '/(href=")/';
                                $newUrl = 'href="' . $newPath;
                                $content = preg_replace($hrefNotSlash, $newUrl, $content);
                            }
    
                            if (preg_match($hrefDoubleQuotes, $content) ) { // Con / en la ruta y "
                                $newUrl = 'href="' . $newPath;
                                $content = preg_replace($hrefDoubleQuotes, $newUrl, $content);
                            }
                        }
                        
                        // Rutas con url()
                        // cuando la url tiene comillas simples
                        $urlSingleQuotes = "/url\('(?!http:\/\/|https:\/\/|\/\/)[^']*\/(?=[^']*'\))/";
                        if (preg_match($urlSingleQuotes, $content) ) {
                            $newUrl = "url('" . $newPath;
                            $content = preg_replace($urlSingleQuotes, $newUrl, $content);
                        }
                        // // cuando la url tiene comillas dobles
                        $urlDoubleQuotes = '/url\("(?!http:\/\/|https:\/\/|\/\/)[^"]*\/(?=[^"]*"\))/';
                        if (preg_match($urlDoubleQuotes, $content)) {
                            $newUrl = 'url("' . $newPath;
                            $content = preg_replace($urlDoubleQuotes, $newUrl, $content);
                            
                        }
                        // cuando la url no tiene comillas
                        $urlNoQuotes = '/url\((?!http:\/\/|https:\/\/|\/\/|\'|")[^)]*\/(?=[^\)]*\))/';
                        if (preg_match($urlNoQuotes, $content)) {
                            $newUrl = 'url(' . $newPath;
                            $content = preg_replace($urlNoQuotes, $newUrl, $content);
                        }
                    }
                    if ($extension === 'css') {
                        // Comprobar si la URL cumple con la expresión regular antes de reemplazarla
                        
                        // cuando la url tiene comillas simples
                        $urlSingleQuotes = "/url\('(?!http:\/\/|https:\/\/|\/\/)[^']*\/(?=[^']*'\))/";
                        if (preg_match($urlSingleQuotes, $content) ) {
                            $newUrl = "url('". $newPath;
                            $content = preg_replace($urlSingleQuotes, $newUrl, $content);
                        }
                        // // cuando la url tiene comillas dobles
                        $urlDoubleQuotes = '/url\("(?!http:\/\/|https:\/\/|\/\/)[^"]*\/(?=[^"]*"\))/';
                        if (preg_match($urlDoubleQuotes, $content)) {
                            $newUrl = 'url("' . $newPath;
                            $content = preg_replace($urlDoubleQuotes, $newUrl, $content);
                            
                        }
                        // cuando la url no tiene comillas
                        $urlNoQuotes = '/url\((?!http:\/\/|https:\/\/|\/\/|\'|")[^)]*\/(?=[^\)]*\))/';
                        if (preg_match($urlNoQuotes, $content)) {
                            $newUrl = 'url(' . $newPath;
                            $content = preg_replace($urlNoQuotes, $newUrl, $content);
                        }
                        
                        // $importURL = '/(@import[\'"])(?!http:\/\/|https:\/\/|\/\/)[^\'"]*\/(?=[^\'"]*[\'"])/';
                    }
                    if ($extension === 'js') {
    
                        // Import
                        $importURL = '/(import\s+[\'"])(?!http:\/\/|https:\/\/|\/\/)[^\'"]*\/(?=[^\'"]*[\'"])/';
                        if (preg_match($importURL, $content) ) {
                            $newURL = $newPath;
                            $content = preg_replace($importURL, $newURL, $content);
                        }
    
                        // url()
                        // cuando la url tiene comillas simples y dobles se encarga las cadenas de rutas, están más abajo
    
                        // cuando la url no tiene comillas
                        $urlNoQuotes = '/url\((?!http:\/\/|https:\/\/|\/\/|\'|")[^)]*\/(?=[^\)]*\))/';
                        $urlNoSlash = '/url\(\s*(?!http:\/\/|https:\/\/|\/\/|\'|"|\/)([^)]*)\s*\)/';
                        if (preg_match($urlNoQuotes, $content) || preg_match($urlNoSlash, $content)) {
                            if (preg_match($urlNoQuotes, $content)) { 
                                $newUrl = 'url(' . $newPath;
                                $content = preg_replace($urlNoQuotes, $newUrl, $content);
                            }
    
                            if (preg_match($urlNoSlash, $content)) { 
                                $content = preg_replace_callback($urlNoSlash, function($matches) use ($newPath) {
                                    // $matches[1] contiene el texto dentro de los paréntesis
                                    return "url(" . $newPath . $matches[1] . ")";
                                }, $content);
                            }
                        }
                        
    
                        // Audio()
                        $audioNoSlash = "/Audio\('([^'\/]*)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.mp3|\.wav)'\)/s";
                        $audioSingleQuotes = "/Audio\('([^']*\/)(?=[^']*)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.mp3|\.wav)'\)/s";
                        if (preg_match($audioSingleQuotes, $content) || preg_match($audioNoSlash, $content)) {
                            if (preg_match($audioSingleQuotes, $content) ) {
                                $content = preg_replace_callback($audioSingleQuotes, function($matches) use ($newPath) { 
                                    return "Audio('" . $newPath . $matches[2] . $matches[3] . "')";
                                }, $content);
                            }
                            
                            if (preg_match($audioNoSlash, $content)) { // Si la ruta no tiene / y '
                                $content = preg_replace_callback($audioNoSlash, function($matches) use ($newPath) { 
                                    return "Audio('" . $newPath . $matches[1] . $matches[2] . "')";
                                }, $content);
                            }
                        }
    
                        
                        $audioNoSlash = '/Audio\("([^"\/]*)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.mp3|\.wav)"\)/s';
                        $audioDoubleQuotes = '/Audio\("([^"]*\/)(?=[^"]*)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.mp3|\.wav)"\)/s';
                        // $audioNoFile = '/Audio\("(.*\/)"/';
                        $audioNoFile = '/Audio\("([^"\/]*)\/([^.\/"]+)\/"/';
                        if (preg_match($audioDoubleQuotes, $content) || preg_match($audioNoSlash, $content) || preg_match($audioNoFile, $content) ) {
                            if (preg_match($audioDoubleQuotes, $content) ) {
                                $content = preg_replace_callback($audioDoubleQuotes, function($matches) use ($newPath) { 
                                    return 'Audio("' . $newPath . $matches[2] . $matches[3] . '")';
                                }, $content);
                            }
                            
                            if (preg_match($audioNoSlash, $content)) { // Si la ruta no tiene / y '
                                $content = preg_replace_callback($audioNoSlash, function($matches) use ($newPath) { 
                                    return 'Audio("' . $newPath . $matches[1] . $matches[2] . '")';
                                }, $content);
                            }
    
                            if (preg_match($audioNoFile, $content)) { // Si la ruta no tiene ficheros
                                $content = preg_replace_callback($audioNoFile, function($matches) use ($newPath) {
                                    return 'Audio("' . $newPath . '"';
                                }, $content);
                            }
                        }
    
                        // cadenas de rutas (por ejemplo: '/ruta/imagen.png';)
                        // Comillas Simples
                        $variableNoSlash = "/'([^'\/]+)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.wav)'/s"; // Sin / en la ruta y '
                        $variableSingleQuotes = "/'([^']*?)\/([^'\/]*?)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.wav)'/"; // Con / en la ruta y '
                        if (preg_match($variableSingleQuotes, $content) || preg_match($variableNoSlash, $content) ) {
                            if (preg_match($variableSingleQuotes, $content)) { // Si la ruta tiene / y '
                                $content = preg_replace_callback($variableSingleQuotes, function($matches) use ($newPath) { 
                                    return "'" . $newPath . $matches[2] . $matches[3] . "'";
                                }, $content);
                            }
    
                            if (preg_match($variableNoSlash, $content)) { // Si la ruta no tiene / y '
                                $content = preg_replace_callback($variableNoSlash, function($matches) use ($newPath) { 
                                    return "'" . $newPath . $matches[1] . $matches[2] . "'";
                                }, $content);
                            }
                        }
    
                        // Comillas Dobles
                        $variableNoSlash = '/"([^"\/]+)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.wav)"/s'; // Sin / en la ruta y "
                        $variableDoubleQuotes = '/"([^"]*?)\/([^"\/]*?)(\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.mp3|\.json|\.ts|\.jsx|\.tsx|\.mjs|\.wasm|\.html|\.xml|\.csv|\.txt|\.md|.cur|\.wav)"/'; // Con / en la ruta y "
                        if (preg_match($variableDoubleQuotes, $content) || preg_match($variableNoSlash, $content) ) {
                            if (preg_match($variableDoubleQuotes, $content)) { // Si la ruta tiene / y "
                                $content = preg_replace_callback($variableDoubleQuotes, function($matches) use ($newPath) { 
                                    return '"' . $newPath . $matches[2] . $matches[3] . '"';
                                }, $content);
                            }
    
                            if (preg_match($variableNoSlash, $content)) { // Si la ruta no tiene / y "
                                $content = preg_replace_callback($variableNoSlash, function($matches) use ($newPath) { 
                                    return '"' . $newPath . $matches[1] . $matches[2] . '"';
                                }, $content);
                            }
                        }
                        
                    }
            
                    // Sobrescribe el archivo con el contenido modificado
                    file_put_contents($path, $content);
                }

            } catch (\Exception $e) {
                return response()->json([
                    'status' => false,
                    'errors' => ErrorHelper::devolverError('fichero', 'Error al modificar las rutas de los ficheros del videojuego. Si no puedes subir el juego, contacta con el desarrollador de la página porque posiblemente aún no se ha desarrollado soporte para la subida de tu videojuego.')
                ], 200); // 400 -> "Bad Request"
            }
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
            'message' => '¡Juego Creado Correctamente!'
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
            'genero' => 'required|in:ESTRATEGIA,SHOOT´EM UP,SHOOTER,PLATAFORMAS,RPG,DEPORTES,LUCHA',
            'historia' => 'string',
            'controles' => 'string',
            'portada' => 'string|max:100',
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
        // Devuelve un array con la cantidad de los likes de cada juego
        $games = Game::all();
        $likesGames = [];
        
        foreach ($games as $game) {
            $likesGames[$game->id] = $game->likes->count();
        }

        return response()->json([
            'status' => true,
            'likesGames' => $likesGames
        ]);

    }

    public function checkLikes()
    {
        // Muestra que juegos ha dado like el usuario autenticado con un valor booleano
        $games = Game::all();
        $user = auth()->user();

        $checkLikes = [];

        foreach ($games as $game) {
            $checkLikes[$game->id] = $game->checkLike($user);
        }

        return response()->json([
            'status' => true,
            'checkLikes' => $checkLikes
        ]);
    }

    public function checkLike($id)
    {
        // Comprueba si el usuario autenticado ha dado like a un juego
        $game = Game::find($id);
        $user = auth()->user();
        $checkLike = $game->checkLike($user);

        return response()->json([
            'status' => true,
            'checkLike' => $checkLike
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
        // Devuelve un array con todas las valoraciones un juego concreto
        $game = Game::find($id);
        $ratingsGame = $game->ratings;

        return response()->json([
            'status' => true,
            'ratingsGame' => $ratingsGame
        ]);

    }

    public function commentsGame($id)
    {
        // Devuelve un array con todos los comentarios un juego concreto
        $game = Game::find($id);
        $commentsGame = $game->comments;

        foreach ($commentsGame as $comment) {
            // $comment['user_id'] = $comment->user;
            $user = $comment->user;
            // valoracion del usuario en el juego
            $rating = $user->ratings->where('game_id', $game->id)->first();
            $user->makeHidden('ratings'); // Ocultamos que muestre todas las valoraciones del usuario
            $comment['user'] = $user;
            $comment['rating'] = ($rating) ? $rating->rating : null;
        }

        return response()->json([
            'status' => true,
            'commentsGame' => $commentsGame
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

    public function creador($id)
    {
        // Devuelve el creador de un juego
        $game = Game::find($id);
        $creador = $game->user;

        return response()->json([
            'status' => true,
            'creador' => $creador
        ]);
    }

}