<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class SystemPages extends Model
{
    protected $table = 'system_pages';
    protected $fillable = array(
        'module',
        'module_slug',
        'page',
        'slug',
        'page_slug',
        'active'
    );
    public $timestamps = false;

    protected function moduleSlug(): Attribute
    {
        return Attribute::make(
            set: fn($value) => Str::snake($value),
        );
    }

    protected function pageSlug(): Attribute
    {
        return Attribute::make(
            set: fn($value) => Str::snake($value),
        );
    }
}
