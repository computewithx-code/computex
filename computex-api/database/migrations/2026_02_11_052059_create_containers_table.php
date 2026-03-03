<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('containers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('compute_sessions')->cascadeOnDelete();
            $table->string('name');
            $table->enum('status',['starting','running','stopped'])->default('starting');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('containers');
    }
};
