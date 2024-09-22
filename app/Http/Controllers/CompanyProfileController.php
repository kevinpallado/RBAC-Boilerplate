<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
// models
use ManagementSettings\Models\SystemCompanyInfo;

class CompanyProfileController extends Controller
{
    public $page = 'company_profile';

    public function index(Request $request): Response {
        $this->getUserAuthorizedAction();
        abort_unless($this->isUserHasAuthorizedAction('read'), 443);

        return Inertia::render('settings/company/company')->with([
            'formBasicQuestions' => SystemCompanyInfo::$basicInformation,
            'formAddressQuestions' =>  SystemCompanyInfo::$companyAddress
        ]);
    }
}
