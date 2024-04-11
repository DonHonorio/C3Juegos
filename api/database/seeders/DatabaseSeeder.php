<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Schema::disableForeignKeyConstraints();

        $this->call([
            UserSeeder::class,
            GameSeeder::class,
            LikeSeeder::class,
            RatingSeeder::class,
            CommentSeeder::class,
        ]);

        Model::reguard();
        Schema::enableForeignKeyConstraints();
    }
}
