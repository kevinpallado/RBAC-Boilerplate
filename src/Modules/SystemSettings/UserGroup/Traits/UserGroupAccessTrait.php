<?php

namespace Modules\SystemSettings\UserGroup\Traits;
// models
use App\Models\SystemUserAccess;
// plugin
use Carbon\Carbon;

trait UserGroupAccessTrait {

    public function groupAccess($viewOnly = false) {
        return SystemUserAccess::select('system_pages.page_slug')
            ->leftJoin('system_pages','system_pages.id','system_user_access.page_id')
            ->where('access_type','group')->where('access_id', auth()->user()->group_id)
            ->when($viewOnly, fn($query) => $query->where('action','read'))
            ->get();
    }
}