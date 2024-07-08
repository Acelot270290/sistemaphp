<?php

return [
    'api' => [
        'endpoint' => env('STREAMLABS_API_ENDPOINT'),
        'client_id' => env('STREAMLABS_CLIENT_ID'),
        'client_secret' => env('STREAMLABS_CLIENT_SECRET'),
        'grant_type' => 'client_credentials',
        'code'=> env('STREAMLABS_CODE'),
        'redirect_uri'=>env('STREAMLABS_REDIRECT_URI')
    ],

    'access_token' => env('ACCESS_TOKEN'),
    
];