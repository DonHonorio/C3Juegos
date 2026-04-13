<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceCorrectCorsHeaders
{
    public function handle(Request $request, Closure $next)
    {
        // Manejar peticiones OPTIONS (preflight)
        if ($request->isMethod('OPTIONS')) {
            return $this->getCorsResponse();
        }

        $response = $next($request);
        
        // Usar header_remove de PHP nativo para eliminar TODOS los headers CORS
        // Esto se ejecuta ANTES de que Nginx los añada
        header_remove('Access-Control-Allow-Origin');
        header_remove('Access-Control-Allow-Methods');
        header_remove('Access-Control-Allow-Headers');
        header_remove('Access-Control-Allow-Credentials');
        
        // Ahora establecer SOLO los correctos
        header('Access-Control-Allow-Origin: https://c3juegos-frontend.qtv68r.easypanel.host');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');

        return $response;
    }
    
    private function getCorsResponse()
    {
        header_remove('Access-Control-Allow-Origin');
        header_remove('Access-Control-Allow-Methods');
        header_remove('Access-Control-Allow-Headers');
        header_remove('Access-Control-Allow-Credentials');
        
        header('Access-Control-Allow-Origin: https://c3juegos-frontend.qtv68r.easypanel.host');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
        
        return response('', 200);
    }
}