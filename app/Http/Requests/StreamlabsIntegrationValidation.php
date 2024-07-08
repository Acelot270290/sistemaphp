<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StreamlabsIntegrationValidation extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = auth()->id();

        return [
            'integration_exists' => Rule::unique('integrations')
                ->where(function ($query) use ($userId) {
                    return $query->where('user_id', $userId)
                        ->where('service', 'streamlabs');
                }),
        ];
    }

    public function messages()
    {
        return [
            'integration_exists.unique' => 'Usuário já integrado com Streamlabs.',
        ];
    }
}
