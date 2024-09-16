<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
// traits
use ManagementSettings\Traits\SystemUserAccessTrait;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests, SystemUserAccessTrait;
}
