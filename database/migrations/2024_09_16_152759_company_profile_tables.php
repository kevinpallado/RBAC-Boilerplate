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
        Schema::create('system_company_info', function(Blueprint $table) {
            $table->string('info_tag');
            $table->string('info_slug');
            $table->longText('info_value')->nullable();
        });

        Schema::create('system_company_branches', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->nullable();
            $table->string('street_address')->nullable();
            $table->string('brgy')->nullable();
            $table->string('city')->nullable();
            $table->string('province_state')->nullable();
            $table->string('postal')->nullable();
            $table->string('country')->default('PH');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('system_user_data_access', function(Blueprint $table) {
            $table->integer('access_id');
            $table->integer('branch_id');
            $table->string('access_type');
        });

        Schema::create('system_policies', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->longText('description');
            $table->string('policy_value_type');
            $table->string('policy_value');
            $table->boolean('active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_company_info');

        Schema::dropIfExists('system_company_branches');

        Schema::dropIfExists('system_user_data_access');
    }
};
