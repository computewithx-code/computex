<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{public function up(): void
{
    Schema::table('containers', function (Blueprint $table) {
        $table->foreignId('host_id')->nullable()->constrained()->cascadeOnDelete();
        $table->integer('cpu_usage')->default(0);
        $table->integer('memory_usage')->default(0);
        $table->timestamp('started_at')->nullable();
        $table->timestamp('stopped_at')->nullable();
    });
}

public function down(): void
{
    Schema::table('containers', function (Blueprint $table) {

        $table->dropForeign(['host_id']); // DROP FK FIRST
        $table->dropColumn('host_id');

        $table->dropColumn('cpu_usage');
        $table->dropColumn('memory_usage');
        $table->dropColumn('started_at');
        $table->dropColumn('stopped_at');
    });
}

};