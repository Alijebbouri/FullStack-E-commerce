<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'product_id',
        'qty',
        'price',
    ];
    protected $with =['product'];
    public function order()
    {
        return $this->belongsTo(Order::class,'order_id','id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class,'product_id','id');
    }
}
