<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StreamElemtsValidation extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'account_id' => 'required|string',
            'jwt' => 'required|string',
        ];
    }
}
