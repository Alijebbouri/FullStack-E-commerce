<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Carbon\Carbon;
class SatistiqueController extends Controller
{
    public function index(){
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalOrders = Order::count();
        $today = Carbon::now()->format('Y-m-d');
        $month = Carbon::now()->format('m');
        $year = Carbon::now()->format('Y');
        $todayOrder = Order::whereDate('created_at', $today)->count();
        $monthOrder = Order::whereMonth('created_at', $month)->count();
        $yearOrder = Order::whereYear('created_at', $year)->count();
        return response()->json([
            'status'=>200,
            'totalProducts'=>$totalProducts,
            'totalCategories'=>$totalCategories,
            'totalOrders'=>$totalOrders,
            'todayOrder'=>$todayOrder,
            'monthOrder'=>$monthOrder,
            'yearOrder'=>$yearOrder,
        ]);
    }

}
