<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'slug',
        'name',
        'description',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'selling_price',
        'original_price',
        'quantity',
        'brand',
        'image',
        'featured',
        'popular',
        'status',
    ];
    protected $with =['category'];
    public function category()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }
    // public function carts(){
    //     return $this->hasMany(Cart::class,'product_id','id');
    // }

}
