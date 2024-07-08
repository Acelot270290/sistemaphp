<?php

return [
    'api' => [
        'endpoint' => env('SMARTFASTPAY_API_ENDPOINT'),
        'username' => env('SMARTFASTPAY_USERNAME'),
        'password' => env('SMARTFASTPAY_PASSWOARD'),
        'grant_type' => 'client_credentials',
        'callback' => env('SMARTFASTPAY_CALLBACK'),
    ],
    'secret' => env('SMARTFASTPAY_SECRET'),
];