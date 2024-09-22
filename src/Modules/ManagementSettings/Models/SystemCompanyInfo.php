<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class SystemCompanyInfo extends Model
{
    protected $table = 'system_company_info';
    protected $fillable = array(
        'info_tag',
        'info_slug',
        'info_value'
    );
    // simple text
    public static $basicInformation = [
        ['question' => 'Name', 'type' => 'text', 'slug' => 'name'],
        ['question' => 'Alias', 'type' => 'text', 'slug' => 'alias'],
        ['question' => 'Number of Satellite Branch', 'type' => 'number', 'slug' => 'number_satellite_branch'],
        ['question' => 'Phone Number', 'type' => 'text', 'slug' => 'phone_number'],
        ['question' => 'Telephone Number', 'type' => 'text', 'slug' => 'telephone_number'],
        ['question' => 'Fax Number', 'type' => 'text', 'slug' => 'fax_number'],
        ['question' => 'Email Address', 'type' => 'text', 'slug' => 'website']
    ];
    // simple text
    public static $companyAddress = [
        ['question' => 'Street Address', 'type' => 'text', 'slug' => 'street_address'],
        ['question' => 'City/Municipality', 'type' => 'text', 'slug' => 'city_municipality'],
        ['question' => 'Province/State', 'type' => 'number', 'slug' => 'province_state'],
        ['question' => 'Region', 'type' => 'text', 'slug' => 'region'],
        ['question' => 'Zip Code', 'type' => 'text', 'slug' => 'zip_code']
    ];
}