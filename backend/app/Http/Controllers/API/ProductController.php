<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        if($products){
            return response()->json([
                'status'=>200,
                'products'=>$products
            ]);
        }
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'selling_price' => 'required',
            'original_price' => 'required',
            'quantity' => 'required',
            'brand' => 'required',
            'image' => 'required|image|mimes:png,jpg|max:2048',
        ]);
        if ($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        $product = new Product();
        $product->category_id = $request->category_id;
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->description = $request->description;
        $product->meta_title = $request->meta_title;
        $product->meta_keyword = $request->meta_keyword;
        $product->meta_description = $request->meta_description;
        $product->selling_price = $request->selling_price;
        $product->original_price = $request->original_price;
        $product->quantity = $request->quantity;
        $product->featured  = $request->featured == true ? '1' :'0';
        $product->popular = $request->popular == true ? '1' :'0';
        $product->status = $request->status == true ? '1' :'0';
        $product->brand = $request->brand;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('uploads/products/', $filename);
            $product->image= 'uploads/products/'.$filename;
        }
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Product created successfully',
        ]);

    }
    public function edit($id){
        $product = Product::find($id);
        if($product) {
            return response()->json([
                'status'=>200,
                'product'=>$product,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Product Not Found',
            ]);

        }
    }
    public function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'selling_price' => 'required',
            'original_price' => 'required',
            'quantity' => 'required',
            'brand' => 'required',
        ]);
        if ($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        $product = Product::find($id);
        if($product){
        $product->category_id = $request->category_id;
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->description = $request->description;
        $product->meta_title = $request->meta_title;
        $product->meta_keyword = $request->meta_keyword;
        $product->meta_description = $request->meta_description;
        $product->selling_price = $request->selling_price;
        $product->original_price = $request->original_price;
        $product->quantity = $request->quantity;
        $product->featured  = $request->featured == true ? '1' :'0';
        $product->popular = $request->popular == true ? '1' :'0';
        $product->status = $request->status == true ? '1' :'0';
        $product->brand = $request->brand;
        if ($request->hasFile('image')) {
            $path = $product->image;
            if(File::exists($path)) {
                File::delete($path);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('uploads/products/', $filename);
            $product->image= 'uploads/products/'.$filename;
        }
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Product Updated successfully',
        ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Product Not Found',
            ]);
        }


    }
    public function destroy($id){
        return;
    }
}
