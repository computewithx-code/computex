<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('compute_sessions', function (Blueprint $table) {
            if (!Schema::hasColumn('compute_sessions', 'host')) {
                $table->string('host')->nullable();
            }
            if (!Schema::hasColumn('compute_sessions', 'status')) {
                $table->enum('status', ['starting','running','stopped','completed'])->default('starting');
            }
            if (!Schema::hasColumn('compute_sessions', 'start_time')) {
                $table->timestamp('start_time')->nullable();
            }
            if (!Schema::hasColumn('compute_sessions', 'end_time')) {
                $table->timestamp('end_time')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('compute_sessions', function (Blueprint $table) {
            $table->dropColumn(['host','status','start_time','end_time']);
        });
    }
};
