<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            'status'=>200,
            'categories'=>$categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $validatedData = $request->validated();
        $category = Category::create($validatedData);
        if($category){
            return response()->json([
                'status'=>200,
                'message'=>'Category Created Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>400,
                'errors'=>'Failed to create category',
            ]);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = Category::findOrFail($id);
        if($category){
            return response()->json([
                'status'=>200,
                'category'=>$category,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>'No Category Found',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request,$id)
    {
        $validatedData = $request->validated();
        $category = Category::findOrFail($id);
        if($category){
            if(isset($validatedData['status'])) {
                $category->status = $validatedData['status'];
                unset($validatedData['status']); // Remove status from validated data
            }
            $category->update($validatedData);
            return response()->json([
                'status'=>200,
                'message'=>'Category Updated Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>400,
                'errors'=>'Failed to update the category',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        if($category){
            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Category deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Category Not Found',
            ]);
        }

    }
}
