<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemUserAccess extends Model
{
    protected $table = 'system_user_access';
    protected $fillable = array(
        'access_id',
        'page_id',
        'access_type',
        'action'
    );
    public $timestamps = false;

    public function page() {
        return $this->belongsTo(systemPages::class, 'page_id');
    }
}
