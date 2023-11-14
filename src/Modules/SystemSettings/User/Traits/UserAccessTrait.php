<?php

namespace Modules\SystemSettings\User\Traits;
// models
use App\Models\SystemUserAccess;
// plugin
use Carbon\Carbon;

trait UserAccessTrait {

    public function userAccess($viewOnly = false) {
        return SystemUserAccess::select('system_pages.page_slug')
            ->leftJoin('system_pages','system_pages.id','system_user_access.page_id')
            ->where('access_type','account')->where('access_id', auth()->user()->id)
            ->when($viewOnly, fn($query) => $query->where('action','read'))
            ->get();
    }
}