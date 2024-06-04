<?php

namespace App\Helpers;

class ErrorHelper
{
    public static function devolverError($campos, $errores, $numErrores = 1) 
{
    $resultado = new \stdClass();

    // Si $campos y $errores no son arrays, los convertimos en arrays
    if (!is_array($campos)) {
        $campos = [$campos];
    }
    if (!is_array($errores)) {
        $errores = [$errores];
    }

    for ($i = 0; $i < $numErrores; $i++) {
        foreach ($campos as $index => $campo) {
            $resultado->$campo[] = $errores[$index];
        }
    }
    return $resultado;
}
}