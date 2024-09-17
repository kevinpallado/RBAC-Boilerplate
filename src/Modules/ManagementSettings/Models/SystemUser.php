<?php

namespace ManagementSettings\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
// models
use App\Models\SystemPages;
// custom traits
use ManagementSettings\Traits\SystemUserAccessTrait;

class SystemUser extends Authenticatable
{
    use SystemUserAccessTrait;

    protected $table = 'system_users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'email',
        'group_id',
        'user_uuid'
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
    protected function userName(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => strtolower(mb_substr(explode(" ", $value)[0], 0, 1).$value[1].Str::random(5)),
        );
    }
    /**
     * User defined table relationship 
     */
    public function userGroup(): BelongsTo
    {
        return $this->belongsTo(SystemUserGroups::class, 'group_id', 'id');
    }
    /**
     * Static functions as user helpers
     */
    public static function generatePassword($password) {
        return Hash::make($password.Str::random(5));
    }
    /** End static function */
    public function userAuthorizedPage() {
        return array_merge($this->getUserPageAccess(true)->toArray(), $this->getUserPageAccess(true, false)->toArray());
    }
    public function userAuthorizedModule() {
        return array_merge($this->getUserModuleAccess(true)->toArray(), $this->getUserModuleAccess(true, false)->toArray());
    }
    public function userPageAuthorizedActions($page) {
        $pageInfo = SystemPages::where('page_slug', $page)->first();
        return array_merge($this->getPageAuthorizedAction($pageInfo->id, auth()->user()->group_id)->toArray(), $this->getPageAuthorizedAction($pageInfo->id, auth()->user()->id, 'user')->toArray());
    }
}
