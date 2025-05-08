<?php

namespace App\Models\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait HelperTrait {

    /**
     * @param Request $request
     * @return $this|false|string
     */

    public function scopeActive($query): void
    {
        $query->where('is_active', '=', 1);
    }
 
    public function scopeOrder($query): void
    {
        $query->orderByDesc('created_at');
    }

    /**Multiple Date Formates */

    public function createdAt() : Attribute{
        return Attribute::make(
            get : fn($value) => date(config('app.dateFormat'), strtotime($value)), 
        );
    }

    public function createdDateTime() : Attribute{
        return Attribute::make(
            get : fn() => date(config('app.dateTimeFormat'), strtotime($this->attributes['created_at'])), 
        );
    }

    public function createdDateTimeStr() : Attribute{
        return Attribute::make(
            get : fn() => strtotime($this->attributes['created_at']), 
        );
    }

    public function rawFormat() : Attribute{
        return Attribute::make(
            get : fn() =>  $this->attributes['created_at']   
        );
    }

    public function createdMonthTime() : Attribute{       
        return new Attribute(
            get : fn() => date('M Y', strtotime( $this->attributes['created_at'] ) ) 
        );
    }

}