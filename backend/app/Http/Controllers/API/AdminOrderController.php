<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function index(){
        $orders = Order::where('status','0')->get();
        if($orders){
            return response()->json([
                'status'=>200,
                'orders'=>$orders
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Order not found'
            ]);
        }
    }
    public function show($id){
        $order = Order::where('id',$id)->first();
        if($order){
            return response()->json([
                'status'=>200,
                'order'=>$order
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Order not found'
            ]);
        }
    }
    public function updateOrderStatus(Request $request,$id){
        $order = Order::where('id',$id)->first();
        if($order){
            $order->status = $request->status === '0' ? '0' : '1';
            $order->save();
            // $order->update([
            //     'status'=>$request->status
            // ]);
            return response()->json([
                'status'=>200,
                'order'=>$order
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Order not found'
            ]);
        }
    }
    public function orderhistory(){
        $orders = Order::where('status','1')->get();
        if($orders){
            return response()->json([
                'status'=>200,
                'orders'=>$orders
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Order not found'
            ]);
        }
    }
}
