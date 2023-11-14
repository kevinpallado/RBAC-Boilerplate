<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
// models
use Modules\SystemSettings\UserGroup\Models\SystemUserGroups;

class UsersGroupController extends Controller
{
    public function index(Request $request): Response {
        return Inertia::render('settings/usergroup/usergroup')->with([
            'usergroup' => GeneralResourceCollection::collection(SystemUserGroups::paginate($request->has('rows') ? $request->rows : 10))
        ]);
    }
}