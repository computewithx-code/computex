<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            $table->integer('balance')->default(0);
            $table->integer('used')->default(0);
            $table->integer('monthly_limit')->default(100);

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('credits');
    }
};
