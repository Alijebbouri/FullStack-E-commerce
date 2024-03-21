<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table="orders";
    protected $fillable = [
        'firstname',
        'lastname',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zipcode'
    ];
    protected $with =['user','orderitems'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function orderitems(){
        return $this->hasMany(Orderitems::class,'order_id','id');
    }
}
