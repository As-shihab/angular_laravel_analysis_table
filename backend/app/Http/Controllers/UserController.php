<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;
class UserController extends Controller{



    public function register(Request $request){
 
   try{
    $validator = Validator::make($request->all(), [
        "name"=>"required | string",
        "email"=>"required | email | unique:users",
        "password"=>"required | min:6"
      ]);

     if($validator->fails()){
        return response()->json([
            "error"=>$validator->errors()
        ]);
     }


     $user = new User();
     $user->name = $request->name;
     $user->email= $request->email;
     $user->password = Hash::make($request->password);

     $user->save();
     $token = $user->createToken($user->name)->plainTextToken;
     return response()->json([
        "message"=>"User created suceesfully",
        "user"=>$user,
        "token"=>$token
     ]);

   }
   catch(Expextation $e){
return response()->json([
    "error"=>$e->getMessage()
]);
   }

  

  

    }
}