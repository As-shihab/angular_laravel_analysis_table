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
        Schema::create("orders" , function(Blueprint  $table){
            $table->id();
           $table->string('productname');
           $table->string('customername');
           $table->integer('product_id');
           $table->integer('customer_id');
           $table->string('price')->nullable();
           $table->boolean('delivary')->default(false)->nullable();
           $table->boolean('stock')->default(false)->nullable();
           $table->boolean('payment')->default(false)->nullable();
           $table->date('order_date');
           $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
