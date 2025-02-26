<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;
use Illuminate\Support\Facades\Auth;
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



public function Login(Request $request)
{

    // Validate input
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:8',
    ]);

    // Find the user by email
    $user = User::where('email', $request->email)->first();

    // Check if user exists
    if (!$user) {
        return response()->json([
            'error' => 'Email does not exist',
        ], 401);
    }

    // Prepare credentials for authentication
    $credentials = $request->only('email', 'password');

    // Attempt to authenticate the user
    if (Auth::attempt($credentials)) {
        // If successful, generate token
        $user = Auth::user();
        $token = $user->createToken('YourAppName')->plainTextToken;

        return response()->json([
            'token' => $token,
            'code' => 200,
            'message' => 'Login successful',
        ], 200);
    }

    // If authentication fails
    return response()->json([
        'error' => 'Invalid credentials',
    ]);
}


    public function Logout(Request $request){
    
    try{
        $user = Auth::user();
     $user->tokens->each(function($token){
        $token->delete();
            return response()->json([
                "message"=>"Logout successfull"
            ]);
     });
    }
    catch(Exception){
        return response()->json([
            "error"=>"somthing went error"
        ]);
    }
    }
}