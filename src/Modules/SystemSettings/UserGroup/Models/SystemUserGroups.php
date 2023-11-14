<?php

namespace Modules\SystemSettings\UserGroup\Models;

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

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn($value) => Str::snake($value),
        );
    }
}
