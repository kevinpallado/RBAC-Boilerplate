<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class SharedDataRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'title' => config('app.name'),
            'notification' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'auth' => [
                'user' => $request->user(),
                'access' => auth()->check() ? auth()->user()->userAuthorizedPage() : [],
                'modules' => auth()->check() ? auth()->user()->userAuthorizedModule() : []
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'errorBags' => function () {
                return collect(optional(Session::get('errors'))->getBags() ?: [])->mapWithKeys(function ($bag, $key) {
                    return [$key => $bag->messages()];
                })->all();
            },
        ];
    }
}