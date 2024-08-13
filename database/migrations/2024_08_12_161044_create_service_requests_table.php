<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('aircraft_id')->constrained('aircraft');
            $table->foreignId('maintenance_company_id')->constrained('maintenance_companies');
            $table->string('description');
            $table->string('priority');
            $table->string('status');
            $table->dateTime('start_date');
            $table->dateTime('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_requests');
    }
};
