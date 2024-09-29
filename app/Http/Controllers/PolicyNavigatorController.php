<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
// models
use ManagementSettings\Models\SystemPolicies;

class PolicyNavigatorController extends Controller
{
    public $page = 'policy_navigator';

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/policy/policy')->with([
            'systemPolicies' => SystemPolicies::getPoliciesByModule(),
            '_action' => auth()->user()->userPageAuthorizedActions($this->page)
        ]);
    }

    public function update(SystemPolicies $policy_navigator, Request $request) {
        switch($policy_navigator->policy_value_type) {
            case 'boolean':
                $policy_navigator->policy_value = $request->policyValue ? "true" : "false";
                $policy_navigator->save();
                break;
        }

        return redirect()->back()->with([
            'message' => 'Successfully updated policy setup.'
        ]);
    }
}
