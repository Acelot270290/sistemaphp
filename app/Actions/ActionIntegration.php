<?php

namespace App\Actions;

use App\Models\Integration;
use App\Models\User;
use App\Services\Streamlabs\StreamlabsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ActionIntegration
{
    use ActionTrait;

    public function __construct(protected readonly StreamlabsService $streamlabsService)
    {}

    public function getIntegrationsStatus()
    {
        $user = $this->getUser();

        $streamlabsIntegration = $user->streamlabsIntegration;
        $streamelementsIntegration = $user->streamelementsIntegration;

        return [
            'streamlabs' => $streamlabsIntegration,
            'streamelements' => $streamelementsIntegration,
        ];
    }

    public function initiateAuthorization()
    {
        $user = $this->getUser();

        return $this->streamlabsService->initiateAuthorization($user->id);
    }

    public function processCallback($userId, $code)
    {
        DB::beginTransaction();

        try {
            $accessToken = $this->streamlabsService->handleCallback($code);

            $serviceId = $this->streamlabsService->getServiceIdByUser($accessToken);
            
            $integration = $this->createOrUpdateStreamlabsIntegration($userId, $accessToken, $serviceId);

            DB::commit();

            return $integration;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::critical('ActionIntegration.processCallback error', [$e->getMessage()]);
            throw $e;
        }

    }

    public function createOrUpdateStreamlabsIntegration($userId, $accessToken, $serviceId)
    {
        $user = User::findOrFail($userId);

        $existingIntegration = $user->streamlabsIntegration()
            ->where('service_id', $serviceId)
            ->first();

        if ($existingIntegration) {
            $existingIntegration->update(['access_token' => $accessToken]);
            return ['status' => 'existing_account', 'integration' => $existingIntegration];
        }

        if (!Integration::where('service_id', $serviceId)->where('service', 'streamlabs')->exists()) {
            $integration = $user->streamlabsIntegration()->create([
                'service' => 'streamlabs',
                'access_token' => $accessToken,
                'service_id' => $serviceId,
                'status' => 1,
            ]);

            return ['status' => 'new_account', 'integration' => $integration];
        }

        return ['status' => 'integration_already_exists', 'integration' => null];
    }

    public function createIntegrationStreamElements(array $integrationData)
    {
        return Integration::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'service' => 'streamelements',
            ],
            [
                'access_token' => $integrationData['jwt'],
                'id_client' => $integrationData['account_id'],
                'status' => true,
            ]
        );
    }

    public function deleteIntegration($integrationId): void
    {
        $integration = Integration::findOrFail($integrationId);
        $integration->delete();
    }

    public function getIntegrationByService(string $service)
    {
        return Integration::where('user_id', auth()->id())->where('service', $service)->first();
    }
}