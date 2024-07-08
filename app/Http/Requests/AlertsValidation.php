<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlertsValidation extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'required|string',
            'image_href' => 'required|url',
            'sound_href' => 'required|url',
            'message' => 'required|string',
            'duration' => 'required|numeric',
            'special_text_color' => 'required|string',
        ];
    }
}
