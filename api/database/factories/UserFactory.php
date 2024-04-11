<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nickname' => $this->faker->unique()->userName,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'name' => $this->faker->firstName(),
            'apellidos' => $this->faker->lastName(),
            'modulo' => $this->modulos[array_rand($this->modulos)],
            'fotoPerfil' => 'https://picsum.photos/200/300',
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    protected $modulos = ['DAW', 'ASIR', 'DAM', 'SMR', 'DAW-DUAL', 'ASIR-DUAL', 'DAM-DUAL', 'SMR-DUAL'];
}
