<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
{
    Schema::table('hosts', function (Blueprint $table) {

        $table->foreignId('user_id')
              ->nullable()
              ->constrained()
              ->cascadeOnDelete();

        $table->string('cpu')->nullable();
        $table->string('ram')->nullable();
        $table->timestamp('last_seen')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hosts', function (Blueprint $table) {
            //
        });
    }
};
