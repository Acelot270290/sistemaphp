<?php

namespace App\Http\Requests;

use App\Rules\ProhibitedWordsRule;
use Illuminate\Foundation\Http\FormRequest;

class DonationValidation extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email',
            'document' => 'required|string',
            'message' => 'required|string|max:50',
            'message' => ['required', 'string', 'max:50', new ProhibitedWordsRule()],
            'amount' => 'required|numeric|gt:0',
            'currency' => 'required|string|in:USD,BRL',
            'slug' => 'required|string|exists:users,slug',
        ];
    }
}