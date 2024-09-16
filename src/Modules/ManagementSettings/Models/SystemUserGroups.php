<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class SystemUserGroups extends Model
{
    protected $table = 'system_user_groups';
    protected $fillable = array(
        'name',
        'slug',
        'removable'
    );
    protected $casts = [
        'removable' => 'boolean',
    ];

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn($value) => Str::snake($value),
        );
    }
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn($value) => ucwords($value),
        );
    }
    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? date("F j, Y g:i a", strtotime($value)) : 'N/A',
        );
    }
}
