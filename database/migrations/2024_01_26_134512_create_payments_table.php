<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->references('id')->onDelete('cascade'); 
            $table->string('transaction_id');
            $table->string('donation_id', 45)->nullable();
            $table->string('name');
            $table->string('email', 150);
            $table->string('document', 14);
            $table->decimal('amount', 18, 8);
            $table->string('currency', 3);
            $table->text('message');
            $table->enum('status', ['pending', 'paid', 'denied', 'expired', 'blocked', 'chargeback', 'refunded'])->default('pending');
            $table->mediumText('pix_qrcode')->nullable();
            $table->json('callback_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}