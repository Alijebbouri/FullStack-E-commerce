<?php

use App\Http\Controllers\API\AdminOrderController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\SatistiqueController;
use App\Http\Controllers\API\UserOrderController;
use App\Http\Controllers\API\WishlistController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('getAllCategory',[FrontendController::class,'getAllCategory']);
Route::get('/filterData', [FrontendController::class, 'filterData']);

Route::get('getProducts/{slug}',[FrontendController::class,'product']);
Route::get('product-informations/{category_slug}/{product_slug}',[FrontendController::class,'Viewproduct']);
Route::post('add-to-cart',[CartController::class,'AddToCart']);
Route::post('add-to-wishlist',[WishlistController::class,'AddToWishlist']);
Route::post('place-order',[CheckoutController::class,'placeorder']);
Route::post('validate-order',[CheckoutController::class,'ValidateOrder']);
Route::get('order',[UserOrderController::class,'index']);
Route::get('order/{id}',[UserOrderController::class,'show']);
Route::get('carts',[CartController::class,'viewCart']);
Route::get('featured-product',[FrontendController::class,'FeaturedProduct']);
Route::get('/popular-product',[FrontendController::class,'PopularProduct']);
Route::get('wishlists',[WishlistController::class,'viewWishlist']);
Route::put('cart-update-quantity/{cart_id}/{scope}',[CartController::class,'updateQuantity']);

Route::delete('delete-cart-item/{cart_id}',[CartController::class,'deleteCartItem']);
Route::delete('delete-wishlist-item/{wishlist_id}',[WishlistController::class,'deleteWishlistItem']);

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=>['auth:sanctum','isAdmin']],function(){
    Route::get('/checkAuth',function(){
        return response()->json(["message"=>"You are logged in","status"=>200],200);
    });
    //Categories
    Route::resource('categories', CategoryController::class);
    //Product
    Route::get('products',[ProductController::class,'index']);
    Route::post('store-product',[ProductController::class,'store']);
    Route::get('edit-product/{id}',[ProductController::class,'edit']);
    Route::post('update-product/{id}',[ProductController::class,'update']);
    //Order
    Route::get('getOrder',[AdminOrderController::class,'index']);
    Route::get('getOrder/{id}',[AdminOrderController::class,'show']);
    Route::get('order-history',[AdminOrderController::class,'orderhistory']);
    Route::put('update-status-order/{id}',[AdminOrderController::class,'updateOrderStatus']);
    //satistique
    Route::get('satistique',[SatistiqueController::class,'index']);

});
Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('/logout',[AuthController::class,'logout']);
});
