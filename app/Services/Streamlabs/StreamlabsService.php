<?php

namespace App\Services\Streamlabs;

use App\Clients\StreamlabsClients;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class StreamlabsService
{
    private StreamlabsClients $streamlabsClient;

    public function __construct(StreamlabsClients $streamlabsClient)
    {

        $this->streamlabsClient = $streamlabsClient;
    }

    public function initiateAuthorization($userId)
    {
        return $this->streamlabsClient->initiateAuthorization($userId);
    }

    public function handleCallback($code)
    {
        $response =  $this->streamlabsClient->handleCallback($code);

        Log::debug('StreamlabsService.handleCallback response', [$response]);

        return $response['access_token'];
    }

    public function getServiceIdByUser($accessToken)
    {
        $response = $this->streamlabsClient->users($accessToken);

        Log::debug('StreamlabsService.getServiceIdByUser response', [$response->json()]);

        $userData = $response->json();

        return $userData['streamlabs']['id'];
    }

    public function donations($slug)
    {
        try {
            $response =  $this->streamlabsClient->Donations($slug);

            Log::debug('StreamlabsService.Donations response', [$response->json()]);

            return $response->json();
        } catch (\Exception $e) {
            Log::critical('StreamlabsService.Donations error', [$e->getMessage()]);
            throw $e;
        }
    }

    public function getLastDonation($slug)
    {
        try {
            $response = $this->streamlabsClient->Donations($slug);
            $donations = $response->json();

            if (!empty($donations['data']) && count($donations['data']) > 0) {
                $lastDonation = $donations['data'][0];

                return response()->json([
                    'name' => $lastDonation['name'],
                    'amount' => $lastDonation['amount'],
                    'message' => $lastDonation['message'] ?? '',
                ]);
            }

            return response()->json(['error' => 'No donations found'], 404);
        } catch (\Exception $e) {
            Log::critical('StreamlabsService.getLastDonation error', [$e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getRankingDonation($slug)
    {
        try {
            $response = $this->streamlabsClient->Donations($slug);
            $donations = $response->json();

            if (!empty($donations['data']) && count($donations['data']) > 0) {
                usort($donations['data'], function ($a, $b) {
                    return $b['amount'] <=> $a['amount'];
                });
                return $donations;
            }

            return response()->json(['error' => 'No donations found'], 404);
        } catch (\Exception $e) {
            Log::critical('StreamlabsService.getRanking error', [$e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function postDonation(array $data, User $user)
    {
        try {
            Log::debug(__CLASS__ . '.' . __FUNCTION__ . ' - data', [$data]);

            $response =  $this->streamlabsClient->postDonation($data, $user->slug);

            Log::debug(__CLASS__ . '.' . __FUNCTION__ . ' - response', [$response->json()]);

            return $response->json();
        } catch (\Exception $e) {
            Log::critical(__CLASS__ . '.' . __FUNCTION__ . ' - error', [$e->getMessage()]);
            
            throw $e;
        }
    }

    public function alerts(array $data)
    {
        try {
            $response =  $this->streamlabsClient->Alerts($data);

            Log::debug('StreamlabsService.Alerts response', [$response->json()]);

            return $response->json();
        } catch (\Exception $e) {
            Log::critical('StreamlabsService.Alerts error', [$e->getMessage()]);
            throw $e;
        }
    }
}