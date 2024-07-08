<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserValidation extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'user' => 'required|unique:users,user',
            'password' => 'required|string|min:3',
            
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'O email já existe. Por favor, faça login.',
            'user.unique' => 'O apelido já existe. Por favor, escolha outro.',
        ];
    }
}
