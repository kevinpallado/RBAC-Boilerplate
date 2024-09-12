<?php

namespace Modules\SystemSettings\User\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// custom traits
use Modules\SystemSettings\User\Traits\UserAccessTrait;

class SystemUser extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, UserAccessTrait;

    protected $table = 'system_users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'group_id',
        'adminstrator',
        'benefactor',
        'beneficiary',
        'last_logged_in',
        'active'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'active' => 'boolean'
    ];

    protected function lastLoggedIn(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? date("F j, Y g:i a", strtotime($value)) : 'Not yet Logged In',
        );
    }

    public function mergeViewAccess() {
        return array_merge($this->getUserPageAccess(true)->toArray(), $this->getUserPageAccess(true, false)->toArray());
    }
}
