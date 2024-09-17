<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
use ManagementSettings\Models\SystemUserGroups;

class PolicyNavigatorController extends Controller
{
    public $page = 'policy_navigator';

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/usergroup/usergroup')->with([
            'usergroup' => GeneralResourceCollection::collection(SystemUserGroups::paginate($request->has('rows') ? $request->rows : 10)),
            '_action' => auth()->user()->userPageAuthorizedActions($this->page)
        ]);
    }
}
