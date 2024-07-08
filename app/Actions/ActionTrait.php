<?php

namespace App\Actions;

use Illuminate\Support\Facades\Auth;

trait ActionTrait
{
    protected function getUser()
    {
        return Auth::user();
    }
}