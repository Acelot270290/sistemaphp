<?php

namespace App\Http\Controllers;

use App\Actions\ActionUser;

class UserController extends Controller
{
    protected ActionUser $actionUser;

    public function __construct(ActionUser $actionUser)
    {
        $this->actionUser = $actionUser;
    }

    public function getUserBySlug(string $slug)
    {
        $data = $this->actionUser->getUserBySlug($slug);

        return response()->json($data);
    }
}