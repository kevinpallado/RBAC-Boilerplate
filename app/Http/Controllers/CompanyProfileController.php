<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
// models
use ManagementSettings\Models\SystemCompanyBranches;
use ManagementSettings\Models\SystemCompanyInfo;

class CompanyProfileController extends Controller
{
    public $page = 'company_profile';

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/company/company')->with([
            'formQuestions' => SystemCompanyInfo::get(),
            'companyBranches' => SystemCompanyBranches::get()
        ]);
    }

    public function create(Request $request): Response {
        return Inertia::render('settings/company/forms/company-branch-form');
    }

    public function store(Request $request): RedirectResponse {
        foreach($request->all() as $formkey => $formValue) {
            SystemCompanyInfo::where('info_slug', $formkey)->update([
                'info_value' => $formValue
            ]);
        }

        return redirect()->back()->with([
            'message' => 'Successfully updated company info'
        ]);
    }
}
