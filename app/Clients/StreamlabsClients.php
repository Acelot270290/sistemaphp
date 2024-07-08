<?php

declare(strict_types=1);

namespace App\Clients;

use App\Models\Integration;
use Illuminate\Http\Client\Response;

class StreamlabsClients extends BaseClient
{
    public function __construct()
    {
        parent::__construct(config('streamlabs.api.endpoint'));
    }

    protected array $headers = [
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
    ];

    public function initiateAuthorization($userId)
    {
        $clientId = config('streamlabs.api.client_id');
        $redirectUri = config('streamlabs.api.redirect_uri');
        $scope = 'donations.create donations.read';
        $state = $userId;

        return config('streamlabs.api.endpoint') . "/authorize?client_id={$clientId}&redirect_uri={$redirectUri}&scope={$scope}&response_type=code&state={$state}";
    }

    public function handleCallback($code): array
    {
        $response = $this->getHttpInstance()
            ->withHeaders($this->headers)
            ->post(config('streamlabs.api.endpoint') . '/token', [
                'client_id' => config('streamlabs.api.client_id'),
                'client_secret' => config('streamlabs.api.client_secret'),
                'redirect_uri' => config('streamlabs.api.redirect_uri'),
                'code' => $code,
                'grant_type' => 'authorization_code',
            ]);

        return $response->json();
    }

    private function getAccessToken($slug): string
    {
        $integration = Integration::whereHas('user', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })->first();

        return $integration ? $integration->access_token : '';
    }


    public function users($accessToken): Response
    {
        return $this->getHttpInstance()
            ->withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $accessToken,
            ])
            ->get('/user');
    }

    public function postDonation(array $data, $slug): Response
    {
        $accessToken = $this->getAccessToken($slug);
        $this->headers['Authorization'] = 'Bearer ' . $accessToken;
        return $this->getHttpInstance()
            ->withHeaders($this->headers)
            ->post('/donations', $data);
    }

    public function donations($slug): Response
    {
        $accessToken = $this->getAccessToken($slug);
        $this->headers['Authorization'] = 'Bearer ' . $accessToken;
        return $this->getHttpInstance()
            ->withHeaders($this->headers)
            ->get('/donations?limit=100');
    }

    public function alerts(array $data): Response
    {
        return $this->getHttpInstance()
            ->withHeaders($this->headers)
            ->post('/alerts', $data);
    }
}