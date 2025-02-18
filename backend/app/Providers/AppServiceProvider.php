<?php

namespace App\Providers;


use Flat3\Lodata\Facades\Lodata;

use Illuminate\Support\ServiceProvider;
use App\Models\Product;
use App\Models\Customar;
use App\Models\Order;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
        Lodata::discover(Product::class);
        Lodata::discover(Order::class);
        Lodata::discover(Customar::class);


    }
}
