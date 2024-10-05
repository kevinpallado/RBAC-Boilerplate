<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
// models
use App\Models\SystemActions;
use App\Models\SystemPages;
use App\Models\SystemUserAccess;
use ManagementSettings\Models\SystemCompanyBranches;
use ManagementSettings\Models\SystemUser;
use ManagementSettings\Models\SystemUserGroups;
// validations
use ManagementSettings\Validations\StoreSystemUserRequest;
use ManagementSettings\Validations\UpdateSystemUserRequest;

class UsersController extends Controller
{
    public $page = 'users';

    public function __construct() {
        $this->userGroup = SystemUserGroups::select('id','name')->get();
        $this->companyBranch = SystemCompanyBranches::select('id as value','name as label')->get()->toArray();
    }

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);
        return Inertia::render('settings/user/user')->with([
            'users' => GeneralResourceCollection::collection(SystemUser::with('userGroup:id,name')
                ->withCount(['dataAccess'])
                ->when($request->search, fn($query, $search) => $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('user_uuid', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                )
                ->paginate($request->has('rows') ? $request->rows : 10)
            ),
            '_action' => auth()->user()->userPageAuthorizedActions($this->page)
        ]);
    }

    public function create(Request $request): Response {
        $this->getUserAuthorizedAction();
        $this->getModuleSystemPolicy();
        abort_unless($this->isUserHasAuthorizedAction('store'), 443);

        return Inertia::render('settings/user/forms/user-form')->with([
            'userGroups' => $this->userGroup,
            'companyBranch' => $this->companyBranch,
            '_policies' => $this->modulePolicy
        ]);
    }

    public function store(StoreSystemUserRequest $request): RedirectResponse {
        $userReference = SystemUser::create(array_merge($request->except('action'),
            [
                'name' => $request->first_name.' '.$request->last_name,
                'user_name' => $request->first_name.' '.$request->last_name,
                'password' => $request->modulePolicy['UserDefaultPassword'] ? SystemUser::generatePassword($request->first_name) : Hash::make($request->password),
            ]
        ));

        SystemCompanyBranches::applyUserDataAccess(
            $request->modulePolicy['UserDefaultDataAccess'], 
            $request->dataAccess,
            $userReference->id
        );

        return redirect()->back()->with([
            'message' => 'Successfully create user account.'
        ]);
    }

    public function show(Request $request, SystemUser $user): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('update'), 443);

        $userAccess = SystemUserAccess::where('access_type','user')->where('access_id', $user->id)->get();
        $groupAccess = SystemUserAccess::where('access_type','group')->where('access_id', $user->group_id)->get();
        return Inertia::render('settings/user/user-access-lists')->with([
            'access' => $groupAccess,
            'actions' => SystemActions::get(),
            'pages' => SystemPages::getPagesByModule(),
            'user' => $user,
        ]);
    }

    public function edit(SystemUser $user): Response {
        $this->getUserAuthorizedAction();
        $this->getModuleSystemPolicy();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/user/forms/user-form')->with([
            'userGroups' => $this->userGroup,
            'companyBranch' => $this->companyBranch,
            '_policies' => $this->modulePolicy,
            'user' => $user,
            'dataAccess' => $user->dataAccessIds()
        ]);
    }

    public function update(UpdateSystemUserRequest $request, SystemUser $user): RedirectResponse {
        switch($request->action) {
            case 'user-detail':
                $user->name = $request->first_name.' '.$request->last_name;
                $user->first_name = $request->first_name;
                $user->last_name = $request->last_name;
                $user->email = $request->email;
                $user->group_id = $request->group_id;
                $user->save();

                SystemCompanyBranches::applyUserDataAccess(
                    $request->modulePolicy['UserDefaultDataAccess'], 
                    $request->dataAccess,
                    $user->id
                );
        
                return redirect()->route('system-settings.users.edit', $user->id)->with([
                    'message' => 'Successfully updated user account.'
                ]);
            case 'user-access':
                // wipe off all current access
                SystemUserAccess::where('access_id', $user->id)->where('access_type', 'user')->delete();
                // store all access base on selection
                foreach($request->userAccess as $access) {
                    if($access['access_type'] === 'user') {
                        SystemUserAccess::create($access);
                    }
                }
                return redirect()->back()->with([
                    'message' => 'Successfully updated user access.'
                ]);
        }
    }

    public function destroy(SystemUser $user): RedirectResponse {
        $user->delete();

        return redirect()->back()->with([
            'message' => 'Successfully archived user.'
        ]);
    }

    public function myProfile(Request $request): Response {
        return Inertia::render('user/my-profile');
    }
}