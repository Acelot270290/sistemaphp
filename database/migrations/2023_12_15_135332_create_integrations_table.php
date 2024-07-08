<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('integrations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('service');
            $table->integer('service_id')->nullable();
            $table->longText('access_token'); 
            $table->longText('id_client')->nullable(); 
            $table->boolean('status')->nullable();
            $table->timestamps();   
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');   
            $table->unique(['service','service_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integrations');
    }
};
