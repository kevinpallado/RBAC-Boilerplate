<?php

namespace Modules\SystemSettings\User\Traits;
// models
use Modules\SystemSettings\User\Models\SystemUser;
// plugin
use Carbon\Carbon;

trait UserLogsTrait {

    public function loggedInStamp() {
        SystemUser::where('id',auth()->user()->id)->update([
            'last_logged_in' => Carbon::now()
        ]);

        return;
    }
}