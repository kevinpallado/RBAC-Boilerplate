<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    public function index(Request $request): Response {
        return Inertia::render('settings/usergroup/usergroup')->with([
            'usergroup' => GeneralResourceCollection::collection(SystemUserGroups::paginate($request->has('rows') ? $request->rows : 10))
        ]);
    }
    public function edit(SystemUserGroups $user_group): Response {
        return Inertia::render('settings/usergroup/usergroup-access-lists')->with([
            'userGroup' => $user_group,
            'access' => SystemUserAccess::where('access_type','group')->where('access_id', $user_group->id)->get(),
            'actions' => SystemActions::get(),
            'pages' => SystemPages::get()->groupBy('module_slug')->map(function ($items) {
                return [
                    'module' => $items->first()->module,
                    'module_slug' => $items->first()->module_slug,
                    'pages' => $items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'page' => $item->page,
                            'page_slug' => trim($item->page_slug), // Optional: trim any whitespace
                        ];
                    })->toArray(),
                ];
            }),
        ]);
    }
}