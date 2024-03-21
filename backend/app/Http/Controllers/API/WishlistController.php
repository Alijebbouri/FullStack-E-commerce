<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function AddToWishlist(Request $request){
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck){
                $cart = Wishlist::where('product_id',$product_id)->where('user_id',$user_id)->exists();
                if($cart){
                    return response()->json([
                        'status'=>409,
                        'message'=>'Already Added to Wishlist'
                    ]);
                }else{
                    $wishlist = new Wishlist();
                    $wishlist->user_id = $user_id;
                    $wishlist->product_id = $product_id;
                    $wishlist->save();
                    return response()->json([
                        'status'=>201,
                        'message'=>'Added To Wishlist Successfully!'
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
                'message'=>'You are not authorized, Login To added to wishlist'
            ]);
        }
    }
    public function viewWishlist(){
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $wishlist = Wishlist::where('user_id',$user_id )->get();
            return response()->json([
                'status'=>200,
                'wishlist'=>$wishlist
            ]);
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to view cart'
            ]);
        }
    }
    public function deleteWishlistItem($wishlist_id){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $wishlist = Wishlist::where('user_id',$user_id )->where('id',$wishlist_id)->first();
            if($wishlist){
                $wishlist->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Wishlist item is deleted'
                ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Wishlist id not found'
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
