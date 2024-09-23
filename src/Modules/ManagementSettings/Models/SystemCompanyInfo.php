<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class SystemCompanyInfo extends Model
{
    protected $table = 'system_company_info';
    protected $fillable = array(
        'info_tag',
        'info_slug',
        'info_type',
        'info_category',
        'info_value'
    );
    public $timestamps = false;
}