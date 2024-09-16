<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
// models
use App\Models\SystemActions;
use App\Models\SystemPages;
use App\Models\SystemUserAccess;
use ManagementSettings\Models\SystemUserGroups;

class UsersGroupController extends Controller
{
    public $page = 'user_group';

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/usergroup/usergroup')->with([
            'usergroup' => GeneralResourceCollection::collection(SystemUserGroups::paginate($request->has('rows') ? $request->rows : 10)),
            '_action' => auth()->user()->userPageAuthorizedActions($this->page)
        ]);
    }
    public function edit(SystemUserGroups $user_group): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('update'), 443);

        return Inertia::render('settings/usergroup/usergroup-access-lists')->with([
            'userGroup' => $user_group,
            'access' => SystemUserAccess::where('access_type','group')->where('access_id', $user_group->id)->get(),
            'actions' => SystemActions::get(),
            'pages' => SystemPages::getPagesByModule(),
        ]);
    }
    public function store(Request $request): RedirectResponse {
        SystemUserGroups::create([
            'name' => $request->name,
            'slug' => $request->name,
            'removable' => true
        ]);
        return redirect()->back()->with([
            'message' => 'Successfully added user group'
        ]);
    }
    public function update(Request $request, SystemUserGroups $user_group): RedirectResponse {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('update'), 443);

        switch($request->action) {
            case 'group-access':
                // wipe off all current access
                SystemUserAccess::where('access_id', $user_group->id)->where('access_type', 'group')->delete();
                // store all access base on selection
                foreach($request->groupAccess as $access) {
                    SystemUserAccess::create($access);
                }
                return redirect()->route('system-settings.user-group.edit', $user_group->id)->with([
                    'message' => 'Successfully updated user group access.'
                ]);
            case 'group-detail':
                $user_group->name = $request->name;
                $user_group->slug = $request->name;
                $user_group->save();

                return redirect()->back()->with([
                    'message' => 'Successfully updated user group detail.'
                ]);
        }
        
    }
}