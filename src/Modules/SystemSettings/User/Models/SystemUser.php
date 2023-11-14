<?php

namespace Modules\SystemSettings\User\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// custom traits
use Modules\SystemSettings\User\Traits\UserAccessTrait;
use Modules\SystemSettings\UserGroup\Traits\UserGroupAccessTrait;

class SystemUser extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, UserAccessTrait, UserGroupAccessTrait;

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

    public function mergeViewAccess() {
        return array_merge($this->userAccess(true)->toArray(), $this->groupAccess(true)->toArray());
    }
}
