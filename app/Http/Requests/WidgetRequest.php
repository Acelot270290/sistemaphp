<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WidgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'type' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'rankingPeriod' => 'nullable|string|max:255',
            'rankingDirection' => 'nullable|string|max:255',
            'numberOfUsers' => 'nullable|integer',
            'duration' => 'nullable|integer|max:300',
            'interval' => 'nullable|integer|max:30',
            'enableDisplaySettings' => 'nullable|boolean',
            'enableSong' => 'nullable|boolean',
            'volume' => 'nullable|integer|max:255',
            'durationSong' => 'nullable|numeric|min:0|max:1',
            'barColor' => 'nullable|string|max:255',
            'textColor' => 'nullable|string|max:255',
            'legendColor' => 'nullable|string|max:255',
            'targetAmount' => 'nullable|numeric|min:0',
            'currentAmount' => 'nullable|numeric|min:0',
            'endDate' => 'nullable|date',
        ];


        return $rules;
    }


    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.required' => 'O campo user_id é obrigatório.',
            'user_id.exists' => 'O usuário especificado não existe.',
        ];
    }
}
