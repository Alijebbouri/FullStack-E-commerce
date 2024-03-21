<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function viewCart(){
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('user_id',$user_id )->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cart
            ]);
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to view cart'
            ]);
        }
    }

    public function AddToCart(Request $request){
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_quantity = $request->product_quantity;
            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck){
                $cart = Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists();
                if($cart){
                    return response()->json([
                        'status'=>409,
                        'message'=>'Already Added to Cart'
                    ]);
                }else{
                    $cartItem = new Cart();
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->quantity = $product_quantity;
                    $cartItem->save();
                    return response()->json([
                        'status'=>201,
                        'message'=>'Added To Cart Successfully!'
                    ]);
                }
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Product Not Found'
                ]);
            }

        }else{
            return response()->json([
                'status'=>401,
                'message'=>'You are not authorized, Login To added to cart'
            ]);
        }

    }
    public function updateQuantity($cart_id,$scope){
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            switch($scope){
                case "inc":
                    $cartItem->quantity += 1;
                    break;
                case "dec":
                    $cartItem->quantity -= 1;
                    break;
                default:
                    return response()->json([
                        'status'=>404,
                        'message'=>'Not found'
                    ]);
            }
            $cartItem->update();
            return response()->json([
                'status'=>200,
                'message'=>'Quantity successfully updated'
            ]);
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'You are not authorized, Login To continue'
            ]);
        }
    }
    public function deleteCartItem($cart_id){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('user_id',$user_id )->where('id',$cart_id)->first();
            if($cart){
                $cart->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'cart item is deleted'
                ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'cart id not found'
                ]);
            }
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'login add to cart'
            ]);
        }
    }
}
