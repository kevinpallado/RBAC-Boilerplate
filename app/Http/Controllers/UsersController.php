<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
// resource
use App\Http\Resources\GeneralResourceCollection;
// models
use Modules\SystemSettings\User\Models\SystemUser;

class UsersController extends Controller
{
    public function index(Request $request): Response {
        return Inertia::render('settings/user/user')->with([
            'users' => GeneralResourceCollection::collection(SystemUser::paginate($request->has('rows') ? $request->rows : 10))
        ]);
    }
}