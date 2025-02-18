<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customar extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        
        'role'
    ];
}
