<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
}