<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
// traits
use ManagementSettings\Traits\SystemUserAccessTrait;
// models
use ManagementSettings\Models\SystemUser;
use ManagementSettings\Models\SystemUserGroups;
// validations
use ManagementSettings\Validations\StoreSystemUserRequest;
use ManagementSettings\Validations\UpdateSystemUserRequest;

class UsersController extends Controller
{
    use SystemUserAccessTrait;

    public $page = 'users';

    public function __construct() {
        $this->userGroup = SystemUserGroups::select('id','name')->get();
    }

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/user/user')->with([
            'users' => GeneralResourceCollection::collection(SystemUser::with('userGroup:id,name')
                ->when($request->search, fn($query, $search) => $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('user_uuid', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                )
                ->paginate($request->has('rows') ? $request->rows : 10)
            )
        ]);
    }

    public function create(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('store'), 443);

        return Inertia::render('settings/user/forms/user-form')->with([
            'userGroups' => $this->userGroup
        ]);
    }

    public function store(StoreSystemUserRequest $request): RedirectResponse {
        SystemUser::create(array_merge($request->all(),
            [
                'name' => $request->first_name.' '.$request->last_name,
                'user_name' => $request->first_name.' '.$request->last_name,
                'password' => SystemUser::generatePassword($request->first_name)
            ]
        ));

        return redirect()->back()->with([
            'message' => 'Successfully create user account.'
        ]);
    }

    public function edit(SystemUser $user): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/user/forms/user-form')->with([
            'userGroups' => $this->userGroup,
            'user' => $user
        ]);
    }

    public function update(UpdateSystemUserRequest $request, SystemUser $user): RedirectResponse {
        $user->fill(array_merge($request->except('user_id'),['name' => $request->first_name.' '.$request->last_name]));
        $user->save();

        return redirect()->route('system-settings.users.edit', $user->id)->with([
            'message' => 'Successfully updated user account.'
        ]);
    }

    public function destroy(SystemUser $user): RedirectResponse {
        $user->delete();

        return redirect()->back()->with([
            'message' => 'Successfully archived user.'
        ]);
    }
}