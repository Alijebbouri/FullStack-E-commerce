<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8'
        ]);
        if($validator->fails()){
            return response()->json([
                'errors'=>$validator->messages()
            ]);
        }else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);
            $token = $user->createToken($request->email.'_token',)->plainTextToken;
            return response()->json([
                'status'=>200,
                "username"=>$user->name,
                'token'=>$token,
                'message'=>'Registred Succeffully done'
            ]);

        }
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'errors'=>$validator->messages()
            ]);
        }else{
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'Unauthorized'
                ]);
            }else{
                if($user->role =='1'){
                    $role = 'admin';
                    $token = $user->createToken($request->email.'_token',['server:admin'])->plainTextToken;
                }else{
                    $role = '';
                    $token = $user->createToken($request->email.'_token',[''])->plainTextToken;
                }

                return response()->json([
                    'status'=>200,
                    "username"=>$user->name,
                    'token'=>$token,
                    'message'=>'Login Successfuly done',
                    'role'=>$role
                ]);
            }
        }
    }
    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logout Successful'
        ]);
    }
}
