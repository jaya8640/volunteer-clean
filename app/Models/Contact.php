<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Traits\HelperTrait;

class Contact extends Model
{
    use HasFactory , HelperTrait;

    public $incrementing = false;
    
    protected $fillable = [
        'type',
        'product_id',
        'name',
        'email',
        'phone',
        'message',
    ];
    public function product(){
        return $this->belongsTo(Product::class , 'product_id' );
    }

}