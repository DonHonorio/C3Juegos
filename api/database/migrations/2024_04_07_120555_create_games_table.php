<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nombreJuego', 60)->unique(); //Tiene que ser unique
            $table->enum('genero', $this->generos);
            $table->longText('historia')->nullable();
            $table->longText('controles')->nullable();
            $table->string('portada', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }

    protected $generos = [
        "ESTRATEGIA",
        "SHOOT´EM UP",
        "SHOOTER",
        "PLATAFORMAS",
        "RPG",
        "DEPORTES",
        "LUCHA",
    ];
};
