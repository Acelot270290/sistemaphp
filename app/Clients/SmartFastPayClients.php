<?php

namespace App\Clients;

use Illuminate\Support\Str;

class SmartFastPayClients extends BaseClient
{
    public function __construct()
    {
        parent::__construct(config('smartfastpay.api.endpoint'));
    }

    public function getAccessToken(): ?array
    {
        $response = $this->getHttpInstance()
            ->withBasicAuth(config('smartfastpay.api.username'), config('smartfastpay.api.password'))
            ->post('/oauth2/token', [
                'grant_type' => 'client_credentials',
            ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }

    public function makePayment($paymentData): ?array
    {
        $token = $this->getAccessToken();

        if (!$token) {
            throw new \Exception('Unable to retrieve access token');
        }

        $paymentData['customer_id'] = Str::uuid();
        $paymentData['payment_method'] = 'pix';
        $paymentData['callback'] = config('smartfastpay.api.callback');
        $paymentData['transaction']['id'] = Str::uuid();

        $response = $this->getHttpInstance()
            ->withHeaders([
                'Authorization' => 'Bearer ' . $token['data']['access_token'],
            ])
            ->post('/payment', $paymentData);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }
}