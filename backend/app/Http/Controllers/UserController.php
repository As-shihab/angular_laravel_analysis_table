<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller

{

    public function register(Request $request)
    {
        return response()->json($request);
        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required | max:255',
                'email' => 'required | email',
                'password' => 'required | min:6'
            ]
        );

        if($validate->fails()){

         return response()->json($validate->messages());
        }

         $register= User::create($request);

         $token = $register->createToken($register->name);

         return response()->json([
            'token'=>$token
         ]);


    }

    public function login(Request $request){
        dd($request->all());
        return response()->json($request);
    }
}
