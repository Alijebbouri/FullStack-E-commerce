<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class CheckoutController extends Controller
{
    public function placeorder(Request $request){
        if(auth('sanctum')->check()){

            $validator = Validator::make($request->all(),[
                'firstname' => 'required',
                'lastname' => 'required',
                'phone' => 'required',
                'email' => 'required',
                'address' => 'required',
                'city' => 'required',
                'state' => 'required',
                'zipcode' => 'required',

            ]);

            if ($validator->fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }else {

                $order = new Order;
                $user_id = auth('sanctum')->user()->id;
                $order->user_id =$user_id ;
                $order->firstname=$request->firstname;
                $order->tracking_no = 'jebbouri'.Str::random(10);
                $order->lastname=$request->lastname;
                $order->phone=$request->phone;
                $order->email=$request->email;
                $order->address=$request->address;
                $order->city=$request->city;
                $order->state=$request->state;
                $order->zipcode=$request->zipcode;
                $order->payment_mode=$request->payment_mode;
                $order->payment_id=$request->payment_id;
                $order->status = '0';
                $order->save();
                $cart = Cart::where('user_id',$user_id )->get();
                $orderItems =[];
                foreach($cart as $item){
                    $orderItems[] = [
                        'product_id' => $item->product_id,
                        'qty' => $item->quantity,
                        'price' => $item->product->selling_price,
                    ];
                     $item->product->update([
                         'quantity' =>$item->product->quantity - $item->quantity
                     ]);
                    $order->orderitems()->createMany($orderItems);
                    Cart::destroy($cart);
                };


            }
            return response()->json([
                'status'=>200,
                'message'=>'order placed successfully',
'orderItems'=>$orderItems
            ]);

} else{
    return response()->json([
        'status'=>401,
        'message'=>'login add to checkout'
    ]);
}
}
//     public function placeorder(Request $request)
// {
//     if (auth('sanctum')->check()) {
//         $validator = Validator::make($request->all(), [
//             'firstname' => 'required',
//             'lastname' => 'required',
//             'phone' => 'required',
//             'email' => 'required',
//             'address' => 'required',
//             'city' => 'required',
//             'state' => 'required',
//             'zipcode' => 'required',
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'status' => 422,
//                 'errors' => $validator->messages(),
//             ]);
//         } else {
//             $order = new Order;
//             $user_id = auth('sanctum')->user()->id;
//             $order->user_id = $user_id;
//             $order->firstname = $request->firstname;
//             $order->tracking_no = 'jebbouri' . Str::random(10);
//             $order->lastname = $request->lastname;
//             $order->phone = $request->phone;
//             $order->email = $request->email;
//             $order->address = $request->address;
//             $order->city = $request->city;
//             $order->state = $request->state;
//             $order->zipcode = $request->zipcode;
//             $order->payment_mode = $request->payment_mode;
//             $order->payment_id = $request->payment_id;
//             $order->status = '0';
//             $order->save();

//             $cart = Cart::where('user_id', $user_id)->get();
//             $orderItems = [];

//             foreach ($cart as $item) {
//                 $orderItem = OrderItems::create([
//                     'order_id' => $order->id,
//                     'product_id' => $item->product_id,
//                     'qty' => $item->quantity,
//                     'price' => $item->product->selling_price,
//                 ]);

//                 $item->product->update([
//                     'quantity' => $item->product->quantity - $item->quantity
//                 ]);

//                 $orderItems[] = $orderItem;
//             }

//             Cart::destroy($cart);

//             return response()->json([
//                 'status' => 200,
//                 'message' => 'Order placed successfully',
//                 'orderItems' => $orderItems
//             ]);
//         }
//     } else {
//         return response()->json([
//             'status' => 401,
//             'message' => 'Login required to checkout'
//         ]);
//     }
// }

    public function ValidateOrder(Request $request){
        if(auth('sanctum')->check()){
            $validator = Validator::make($request->all(),[
                'firstname' => 'required',
                'lastname' => 'required',
                'phone' => 'required',
                'email' => 'required',
                'address' => 'required',
                'city' => 'required',
                'state' => 'required',
                'zipcode' => 'required',

            ]);

            if ($validator->fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }else{
                return response()->json([
                    'status'=>200,
                    'message'=>'Form Validated Successfully',
                    // 'orderItems'=>$orderItems
                ]);

            }
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'login add to checkout'
            ]);

        }

    }
}
