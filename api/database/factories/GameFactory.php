<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'nombreJuego' => $this->games[array_rand($this->games)],
            'genero' => $this->generos[array_rand($this->generos)],
            'historia' => $this->faker->paragraph(5),
            'controles' => $this->faker->paragraph(),
            'portada' => 'https://picsum.photos/200/300'
        ];
    }

    protected $games = [
        "The Legend of Zelda: Breath of the Wild",
        "Super Mario Odyssey",
        "The Witcher 3: Wild Hunt",
        "Red Dead Redemption 2",
        "Grand Theft Auto V",
        "Minecraft",
        "Fortnite",
        "Call of Duty: Warzone",
        "Overwatch",
        "Among Us",
        "Animal Crossing: New Horizons",
        "Dark Souls III",
        "League of Legends",
        "Persona 5",
        "Final Fantasy VII Remake",
        "Doom Eternal",
        "Rocket League",
        "Super Smash Bros. Ultimate",
        "FIFA 21",
        "Valorant"
    ];

    protected $generos = [
        "Aventura",
        "Acción",
        "Rol",
        "Deportes",
        "Estrategia",
        "Simulación",
        "Carreras",
        "Indie",
        "Multijugador",
        "Shooter",
        "Plataformas",
        "Lucha",
        "Survival",
        "Battle Royale",
        "RPG",
        "MMORPG",
        "MOBA",
        "Arcade",
        "Puzzle",
        "Terror"
    ];
}
