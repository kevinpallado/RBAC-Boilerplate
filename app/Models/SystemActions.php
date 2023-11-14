<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class SystemActions extends Model
{
    protected $table = 'system_actions';
    protected $fillable = array(
        'name',
        'slug',
        'page'
    );
    public $timestamps = false;

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn($value) => Str::snake($value),
        );
    }
}
