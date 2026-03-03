<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('hosts', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED
            $table->string('name');
            $table->enum('status', ['online', 'offline', 'busy'])->default('offline');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('hosts');
    }
};
