<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function getAllCategory(){
        $category = Category::where('status','0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }


    public function product($slug){
        $category = Category::where('slug',$slug)->where('status','0')->first();
        if($category){
            $product = Product::where('category_id',$category->id)->where('status','0')->get();
            if($product){
                return response()->json([
                    'status' => 200,
                    'product_info' => [
                        'category'=>$category,
                        'product'=>$product,
                    ]
                ]);
            }else{
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product Available'
                ]);
            }

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such category Found'
            ]);
        }
    }
    public function Viewproduct($category_slug,$product_slug){
        $category = Category::where('slug',$category_slug)->where('status','0')->first();
        if($category){
            $product = Product::where('category_id',$category->id)->where('slug',$product_slug)->where('status','0')->first();
            if($product){
                return response()->json([
                    'status' => 200,
                    'product'=>$product,
                ]);
            }else{
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product Available'
                ]);
            }

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such category Found'
            ]);
        }
    }
    public function filterData(Request $request)
    {
        // Get request parameters
        $category = $request->input('category');
        $priceSort = $request->input('priceSort');
        $searchQuery = $request->input('searchQuery');

        // Query builder for products
        $query = Product::query();

        // Apply category filter if provided
        if ($category) {
            $query->where('category_id', $category);
        }

        // Apply price sort if provided
        if ($priceSort === 'high-to-low') {
            $query->orderBy('selling_price', 'desc');
        } elseif ($priceSort === 'low-to-high') {
            $query->orderBy('selling_price', 'asc');
        }

        // Apply search query if provided
        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'like', '%' . $searchQuery . '%');
                // You can add more fields for searching (e.g., description, tags, etc.)
            });
        }

        // Fetch products
        $products = $query->get();

        return response()->json(['status' => 200, 'products' => $products]);
    }
    public function FeaturedProduct(){
        $featured=Product::where('featured','0')->where('status','0')->get();
        if($featured){
            return response()->json([
                'status'=>200,
                'featured'=>$featured
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>'Not Found !'
            ]);
        }
    }
    public function PopularProduct(){
        $popular=Product::where('featured','0')->where('status','0')->get();
        if($popular){
            return response()->json([
                'status'=>200,
                'popular'=>$popular
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>'Not Found !'
            ]);
            }
        }

}
