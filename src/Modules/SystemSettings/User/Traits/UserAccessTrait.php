<?php

namespace Modules\SystemSettings\User\Traits;
// models
use App\Models\SystemPages;
use App\Models\SystemUserAccess;
// plugin
use Carbon\Carbon;

trait UserAccessTrait {

    public array $authorizedAction = [];
    /**
     * $viewOnly specify to get "read" action access
     * $userOnly if set to true only get the user access else it will get group access
     */
    public function getUserPageAccess($viewOnly = false, $userOnly = true) {
        return SystemUserAccess::select('system_pages.page_slug')
            ->leftJoin('system_pages','system_pages.id','system_user_access.page_id')
            ->when($userOnly, 
                fn($query) => $query->where('access_type','account')->where('access_id', auth()->user()->id),
                fn($query) => $query->where('access_type','group')->where('access_id', auth()->user()->group_id),
            )->when($viewOnly, fn($query) => $query->where('action','read'))
            ->get();
    }

    public function getUserAuthorizedAction(): void {
        $systemPage = SystemPages::where('page_slug', $this->page)->first();

        $userAuthorization = SystemUserAccess::select('action')
            ->leftJoin('system_pages','system_pages.id','system_user_access.page_id')
            ->where('access_type','account')
            ->where('access_id', auth()->user()->id)
            ->where('page_id', $systemPage->id)
            ->get()
            ->toArray();
        
        $groupAuthorization = SystemUserAccess::select('action')
            ->leftJoin('system_pages','system_pages.id','system_user_access.page_id')
            ->where('access_type','group')
            ->where('access_id', auth()->user()->group_id)
            ->where('page_id', $systemPage->id)
            ->get()
            ->toArray();
        
        array_map(fn($dataActions) => array_push($this->authorizedAction,$dataActions['action']), array_merge($userAuthorization, $groupAuthorization));

        return;
    }

    public function isUserHasAuthorizedAction($action): bool
    {
        if (in_array($action, $this->authorizedAction)) {
            return true;
        }
        return false;
    }
}