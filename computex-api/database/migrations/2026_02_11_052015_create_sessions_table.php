<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('compute_sessions', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('host_id')->nullable()->constrained('hosts')->nullOnDelete();
            $table->string('name');
            $table->enum('status',['pending','running','completed','failed'])->default('pending');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('credits_used')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('compute_sessions');
    }
};
