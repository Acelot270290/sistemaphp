<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;

class ProhibitedWordsRule implements Rule
{
    /**
     * The list of prohibited words.
     *
     * @var array
     */
    protected array $prohibitedWords;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->loadProhibitedWords();
    }

    /**
     * Load the prohibited words from the JSON file.
     *
     * @return void
     */
    protected function loadProhibitedWords()
    {
        try {
            $hash = "WyJhYnVzbyIsImFudXMiLCJhcnJvbWJhZG8iLCJiYWJhY2EiLCJiYWJhLW92byIsImJpY2hhIiwiYm9jZXRhIiwiYm9xdWV0ZSIsImJvc3RhIiwiYnVjZXRhIiwiYnVuZGFvIiwiYnVycmEiLCJidXJybyIsImNhY2V0ZSIsImNhZ2EiLCJjYWdhZG8iLCJjYWdhbyIsImNhZ29uYSIsImNhc2EgZG8gY2FyYWxobyIsImNhc3NldGUiLCJjaHVwYXIiLCJjbGl0XHUwMGYzcmlzIiwiY29pdGFkYSIsImNvaXRhZG8iLCJjb25hIiwiY29ybmEiLCJjb3JubyIsImN1IiwiY3V6XHUwMGUzbyIsImN1enVkYSIsImRlbWVudGUiLCJkZXNncmFcdTAwZTdhIiwiZG9lbnRlIiwiZG9pZG8iLCJlc2Nyb3RvIiwiZXNjcm90YSIsImVzcGVybWF0b3pcdTAwZjNpZGUiLCJlc3RcdTAwZmFwaWRhIiwiZXN0XHUwMGZhcGlkbyIsImZhc2Npc3RhIiwiZmRwIiwiZmlsaGEgZGEgcHV0YSIsImZpbGhvIGRhIHB1dGEiLCJmb2RhIiwiZm9kaWRhIiwiZm9kaWRvIiwiZnVkZXIiLCJmdWRpZGEiLCJmdWRpZG8iLCJpZGlvdGEiLCJpbWJlY2lsIiwianVtZW50byIsImxva2EiLCJsb2tvIiwibG91Y2EiLCJsb3VjbyIsIm1lcmRhIiwibWVyZXRyaXoiLCJuYXppc3RhIiwibm9qZWlyYSIsIm5vamVudGEiLCJub2plbnRvIiwib3RhcmlhIiwib3RhcmlvIiwicGFuZWxlaXJvIiwicGF1IiwicGF1IG5vIGN1IiwicGVpZG8iLCJwaXJhbmhhIiwicGlyb2NhIiwicGlyb2NvIiwicG9ycmEiLCJwcm9zdGl0dXRhIiwicHV0YSIsInB1dG8iLCJyYWJ1ZGEiLCJyYWJ1ZG8iLCJyZXRhcmRhZGEiLCJyZXRhcmRhZG8iLCJyb2xhIiwic2FmYWRhIiwic2FmYWRvIiwic2FwYXRvbmEiLCJ0YXJhZGEiLCJ0YXJhZG8iLCJ0ZXUgY3UiLCJ0cm94YSIsInZhZGlhIiwidmFnYWJ1bmRhIiwidmFnYWJ1bmRvIiwidmFnaW5hIiwidmFpIHNlIGZvZGVyIiwidmFpLXRlIGZvZGVyIiwidmlhZG8iLCJ4YW5hIiwieGF2YXNjYSIsInhlcmVjYSIsInhvdGEiLCJ4b3hvdGEiLCJhYnVzZSIsImFuYWwiLCJhcnNlIiwiYXNzIiwiYXNzaG9sZSIsImJhc3RhcmQiLCJiaXRjaCIsImJsb3dqb2IiLCJib2xsb2NrIiwiYm9sbG9rIiwiYm9uZXIiLCJib29iIiwiYnVnZ2VyIiwiYnVtIiwiYnV0dCIsImJ1dHRwbHVnIiwiY2xpdG9yaXMiLCJjb2NrIiwiY29vbiIsImNyYXAiLCJjdW50IiwiZGFtbiIsImRpY2siLCJkaWxkbyIsImR5a2UiLCJmYWciLCJmZWNrIiwiZmVsY2hpbmciLCJmZWxsYXRlIiwiZmVsbGF0aW8iLCJmaW5nZXJmdWNrIiwiZmlzdGZ1Y2siLCJmdWNrIiwiZnVkZ2VwYWNrZXIiLCJmdWsiLCJmdXgiLCJqaXp6Iiwia2lrZSIsImtub2JlbmQiLCJsYWJpYSIsImxtYW8iLCJsbWZhbyIsIm11ZmYiLCJuYXppIiwibmlnZ2VyIiwibmlnZ2EiLCJudW1ibnV0cyIsInBlbmlzIiwicGlzcyIsInBvb3AiLCJwcmljayIsInB1YmUiLCJwdXNzeSIsInF1ZWVyIiwic2Nyb3R1bSIsInNoaXQiLCJzaGFnIiwic2x1dCIsInNtZWdtYSIsInNwdW5rIiwidGl0IiwidG9zc2VyIiwidHVyZCIsInR3YXQiLCJ3YW5rIiwid2hvcmUiLCJ3aWxseSJd";
            
            $this->prohibitedWords = json_decode(base64_decode($hash), true);
        } catch (\Exception $e) {
            Log::error(__CLASS__ . '.' . __FUNCTION__ . ' - ' . $e->getMessage());
            $this->prohibitedWords = [];
        }
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        foreach ($this->prohibitedWords as $word) {
            if (stripos($value, $word) !== false) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'O campo :attribute contem palavras inapropriadas.';
    }
}