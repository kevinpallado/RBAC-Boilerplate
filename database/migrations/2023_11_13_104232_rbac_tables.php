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
        Schema::table('system_users', function(Blueprint $table) {
            $table->integer('group_id');
            $table->string('last_logged_in')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('administrator')->default(false);
            $table->boolean('benefactor')->default(false);
            $table->boolean('beneficiary')->default(false);
        });

        Schema::create('system_pages', function(Blueprint $table) {
            $table->id();
            $table->string('module');
            $table->string('module_slug');
            $table->string('page');
            $table->string('page_slug');
            $table->boolean('active')->default(true);
        });

        Schema::create('system_user_groups', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->boolean('removable')->default(false);
            $table->timestamps();
        });

        Schema::create('system_actions', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('page')->default('general');
        });

        Schema::create('system_user_access', function(Blueprint $table) {
            $table->integer('access_id');
            $table->integer('page_id');
            $table->string('access_type');
            $table->string('action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('system_users', function(Blueprint $table) {
            $table->dropColumn(['group_id','last_logged_in','active','administrator','benefactor','beneficiary']);
        });

        Schema::dropIfExists('system_pages');

        Schema::dropIfExists('system_user_groups');

        Schema::dropIfExists('system_actions');

        Schema::dropIfExists('system_user_access');
    }
};
