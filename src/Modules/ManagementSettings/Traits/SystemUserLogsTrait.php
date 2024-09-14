<?php

namespace ManagementSettings\Traits;
// models
use ManagementSettings\Models\SystemUser;
// plugin
use Carbon\Carbon;

trait SystemUserLogsTrait {

    public function loggedInStamp() {
        SystemUser::where('id',auth()->user()->id)->update([
            'last_logged_in' => Carbon::now()
        ]);

        return;
    }
}