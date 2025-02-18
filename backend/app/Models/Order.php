<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable=[
        'customername',
        'productname',
        'product_id',
         'customer_id',
         'order_date'

    ];
}
