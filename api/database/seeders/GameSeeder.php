<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Game::truncate();

        foreach (self::$arrayGames as $game) {
            $newGame = new \App\Models\Game();

            $newGame->user_id = $game["user_id"];
            $newGame->nombreJuego = $game["nombreJuego"];
            $newGame->genero = $game["genero"];
            $newGame->historia = $game["historia"];
            $newGame->controles = $game["controles"];
            $newGame->portada = $game["portada"];

            $newGame->save();
        }

        
    }

    private static $arrayGames = [
        [
            "id" => 1,
            "user_id" => 8,
            "nombreJuego" => "The Legend of Zelda: Breath of the Wild",
            "genero" => "ESTRATEGIA",
            "historia" => "Link despierta de un sueño de 100 años para encontrarse con el reino de Hyrule en ruinas. Cuando descubre que Calamity Ganon amenaza con destruir Hyrule, Link emprende un viaje para derrotarlo antes de que sea demasiado tarde.",
            "controles" => "El juego se controla con el mando de la consola. El jugador puede mover a Link con el joystick izquierdo, y con el joystick derecho puede mover la cámara. Los botones de acción se utilizan para atacar, saltar, correr, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 2,
            "user_id" => 7,
            "nombreJuego" => "Super Mario Odyssey",
            "genero" => "PLATAFORMAS",
            "historia" => "Bowser secuestra a Peach y se dispone a casarse con ella. Mario debe rescatarla y para ello contará con la ayuda de Cappy, un sombrero que le permite poseer a otros personajes y objetos.",
            "controles" => "El juego se controla con el mando de la consola. El jugador puede mover a Mario con el joystick izquierdo, y con el joystick derecho puede mover la cámara. Los botones de acción se utilizan para saltar, correr, lanzar el sombrero, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 3,
            "user_id" => 5,
            "nombreJuego" => "The Witcher 3: Wild Hunt",
            "genero" => "RPG",
            "historia" => "Geralt de Rivia, un cazador de monstruos conocido como brujo, emprende un viaje en busca de su hija adoptiva, Ciri, perseguida por la Cacería Salvaje. En su camino, Geralt se enfrentará a todo tipo de monstruos y peligros.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede mover a Geralt con el joystick izquierdo o las teclas de dirección, y con el joystick derecho o el ratón puede mover la cámara. Los botones de acción se utilizan para atacar, esquivar, lanzar signos, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 4,
            "user_id" => 4,
            "nombreJuego" => "Red Dead Redemption 2",
            "genero" => "ESTRATEGIA",
            "historia" => "Arthur Morgan, un forajido miembro de la banda de Dutch van der Linde, debe huir de la ley y de los cazadores de recompensas mientras intenta mantener unida a su banda en un mundo que está cambiando rápidamente.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede mover a Arthur con el joystick izquierdo o las teclas de dirección, y con el joystick derecho o el ratón puede mover la cámara. Los botones de acción se utilizan para disparar, montar a caballo, interactuar con el entorno, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 5,
            "user_id" => 8,
            "nombreJuego" => "Grand Theft Auto V",
            "genero" => "SHOOTER",
            "historia" => "Michael, Franklin y Trevor son tres criminales con diferentes habilidades y personalidades que se ven envueltos en una serie de atracos y delitos en Los Santos, una versión ficticia de Los Ángeles.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede cambiar entre los tres personajes con un botón específico, y con el joystick izquierdo o las teclas de dirección puede mover al personaje seleccionado. Los botones de acción se utilizan para disparar, conducir, robar, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 6,
            "user_id" => 9,
            "nombreJuego" => "Minecraft",
            "genero" => "ESTRATEGIA",
            "historia" => "En un mundo generado proceduralmente, el jugador debe sobrevivir construyendo refugios, recolectando recursos y enfrentándose a enemigos. Minecraft ofrece un modo creativo sin límites y un modo supervivencia con desafíos.",
            "controles" => "El juego se controla con el teclado y el ratón en PC o con el mando de la consola. El jugador puede mover al personaje con las teclas de dirección, y con el ratón puede mirar alrededor y construir. Los botones de acción se utilizan para romper bloques, colocar bloques, atacar, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 7,
            "user_id" => 2,
            "nombreJuego" => "Fortnite",
            "genero" => "SHOOTER",
            "historia" => "100 jugadores se enfrentan en una isla en un modo de juego battle royale donde solo puede quedar uno. Los jugadores deben recolectar armas, construir estructuras y eliminar a sus oponentes para ser el último en pie.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede mover al personaje con el joystick izquierdo o las teclas de dirección, y con el joystick derecho o el ratón puede mover la cámara. Los botones de acción se utilizan para disparar, construir, recolectar recursos, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 8,
            "user_id" => 8,
            "nombreJuego" => "Call of Duty: Warzone",
            "genero" => "SHOOTER",
            "historia" => "Warzone es un modo de juego battle royale gratuito que se desarrolla en el universo de Call of Duty. Los jugadores deben recolectar armas, dinero y suministros para enfrentarse a sus oponentes en un mapa gigante.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede mover al personaje con el joystick izquierdo o las teclas de dirección, y con el joystick derecho o el ratón puede mover la cámara. Los botones de acción se utilizan para disparar, apuntar, recargar, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 9,
            "user_id" => 7,
            "nombreJuego" => "Overwatch",
            "genero" => "SHOOTER",
            "historia" => "Overwatch es un juego de disparos en primera persona en el que dos equipos de seis jugadores se enfrentan en una variedad de modos de juego. Cada héroe tiene habilidades únicas y un papel específico en el equipo.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede mover al héroe con el joystick izquierdo o las teclas de dirección, y con el joystick derecho o el ratón puede mover la cámara. Los botones de acción se utilizan para disparar, usar habilidades, comunicarse con el equipo, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 10,
            "user_id" => 8,
            "nombreJuego" => "Among Us",
            "genero" => "PLATAFORMAS",
            "historia" => "Among Us es un juego de traición y engaño en el que los jugadores deben completar tareas en una nave espacial mientras intentan descubrir al impostor que intenta sabotear la misión y eliminar a la tripulación.",
            "controles" => "El juego se controla con el teclado y el ratón en PC o con el mando de la consola. El jugador puede mover al personaje con las teclas de dirección, y con el ratón puede interactuar con los objetos y los demás jugadores. Los botones de acción se utilizan para completar tareas, sabotear, votar, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 11,
            "user_id" => 1,
            "nombreJuego" => "Animal Crossing: New Horizons",
            "genero" => "ESTRATEGIA",
            "historia" => "El jugador se convierte en un habitante de una isla desierta y debe construir y personalizar su hogar, interactuar con los vecinos, pescar, recolectar insectos y fósiles, y crear su propio paraíso tropical.",
            "controles" => "El juego se controla con el mando de la consola. El jugador puede mover al personaje con el joystick izquierdo, y con el joystick derecho puede mover la cámara. Los botones de acción se utilizan para interactuar con los objetos, los vecinos, la naturaleza, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 12,
            "user_id" => 10,
            "nombreJuego" => "Dark Souls III",
            "genero" => "ESTRATEGIA",
            "historia" => "En un mundo oscuro y peligroso, el jugador debe enfrentarse a enemigos desafiantes y jefes temibles para descubrir la verdad detrás de la maldición de los no muertos. La muerte es parte del aprendizaje en este juego.",
            "controles" => "El juego se controla con el mando de la consola o con teclado y ratón en PC. El jugador puede mover al personaje con el joystick izquierdo o las teclas de dirección, y con el joystick derecho o el ratón puede mover la cámara. Los botones de acción se utilizan para atacar, esquivar, bloquear, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
        [
            "id" => 13,
            "user_id" => 10,
            "nombreJuego" => "League of Legends",
            "genero" => "RPG",
            "historia" => "En el mundo de Runaterra, dos equipos de cinco jugadores se enfrentan en una batalla estratégica para destruir el nexo enemigo. Cada jugador elige un campeón con habilidades únicas para contribuir a la victoria de su equipo.",
            "controles" => "El juego se controla con el teclado y el ratón. El jugador puede mover al campeón con las teclas de dirección, y con el ratón puede apuntar habilidades y atacar. Los botones de acción se utilizan para lanzar habilidades, comprar objetos, comunicarse con el equipo, etc.",
            "portada" => "https://picsum.photos/200/300"
        ],
    ];
}
