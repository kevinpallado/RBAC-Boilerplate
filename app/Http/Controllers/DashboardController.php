<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(): Response {
        return Inertia::render('Welcome');
    }
}