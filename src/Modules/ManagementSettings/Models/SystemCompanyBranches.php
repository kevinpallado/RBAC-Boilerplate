<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// models
use ManagementSettings\Models\SystemUserDataAccess;

class SystemCompanyBranches extends Model
{
    use HasFactory;
    
    protected $table = 'system_company_branches';
    protected $fillable = array(
        'name',
        'code',
        'street_address',
        'brgy',
        'city',
        'province_state',
        'postal',
        'country',
        'email',
        'phone',
        'active'
    );
    protected $casts = [
        'active' => 'boolean'
    ];

    public static function applyUserDataAccess($policySetup = false, $branchAccess = [], $userId) {
        SystemUserDataAccess::where('access_id', $userId)->where('access_type', 'account')->delete();
        if($policySetup) {
            foreach(self::get() as $branch) {
                SystemUserDataAccess::create([
                    'branch_id' => $branch->id,
                    'access_id' => $userId,
                    'access_type' => 'account'
                ]);
            }
        } else {
            foreach($branchAccess as $branch) {
                SystemUserDataAccess::create([
                    'branch_id' => $branch,
                    'access_id' => $userId,
                    'access_type' => 'account'
                ]);
            }
        }
        return;
    }
}