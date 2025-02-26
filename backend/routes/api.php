<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register' , [UserController::class, 'register']);
Route::post('/login' , [UserController::class, 'Login']);
Route::get('/logout' , [UserController::class, 'Logout'])->middleware(['auth:sanctum']);