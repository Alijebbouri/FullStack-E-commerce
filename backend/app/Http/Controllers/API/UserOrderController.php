<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class UserOrderController extends Controller
{
    public function index(){
        if(auth('sanctum')->check()){
            $orders = Order::where('user_id',auth('sanctum')->user()->id)->get();
            if($orders->isNotEmpty()){
                return response()->json([
                    'status' => 200,
                    'orders' => $orders
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Order found'
                ]);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ],401);
        }
    }

    public function show($id){
        if(auth('sanctum')->check()){
            $order = Order::where('user_id',auth('sanctum')->user()->id)->where('id',$id)->first();
            if($order){
                return response()->json([
                    'status' => 200,
                    'order' => $order
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Order id found'
                ]);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ]);
        }
    }
}
