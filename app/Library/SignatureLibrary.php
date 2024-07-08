<?php

namespace App\Library;

use Illuminate\Support\Facades\Log;

class SignatureLibrary
{
    public function generate(int $timestamp, array $data, string $secret)
    {
        $params_signature = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        $params_signature = "{$timestamp}.{$params_signature}";

        return hash_hmac('sha256', $params_signature, $secret);
    }

    public function validate(int $timestamp, array $data, string $hashmac, string $secret)
    {
        $params_signature = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        $params_signature = "{$timestamp}.{$params_signature}";

        $hash = hash_hmac('sha256', $params_signature, $secret);

        Log::debug('Hash Sent: ' . print_r($hash, true));
        Log::debug('Hash Receive: ' . print_r($hashmac, true));

        return hash_equals($hashmac, $hash);
    }
}
