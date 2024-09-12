<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
// traits
use Modules\SystemSettings\User\Traits\UserAccessTrait;
// models
use Modules\SystemSettings\User\Models\SystemUser;
use Modules\SystemSettings\UserGroup\Models\SystemUserGroups;

class UsersController extends Controller
{
    use UserAccessTrait;

    public $page = 'users';

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/user/user')->with([
            'users' => GeneralResourceCollection::collection(SystemUser::paginate($request->has('rows') ? $request->rows : 10))
        ]);
    }

    public function create(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('store'), 443);

        return Inertia::render('settings/user/forms/user-form')->with([
            'userGroups' => SystemUserGroups::select('id','name')->get()
        ]);
    }

    public function store() {

    }
}