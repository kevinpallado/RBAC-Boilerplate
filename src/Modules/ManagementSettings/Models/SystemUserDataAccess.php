<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;

class SystemUserDataAccess extends Model
{
    protected $table = 'system_user_data_access';
    protected $fillable = array(
        'access_id',
        'branch_id',
        'access_type',
    );
    public $timestamps = false;
}