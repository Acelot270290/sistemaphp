<?php

namespace App\Http\Controllers;

use App\Actions\ActionIntegration;
use App\Http\Requests\StreamElemtsValidation;
use App\Http\Requests\StreamlabsIntegrationValidation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class IntegrationController extends Controller
{
    protected ActionIntegration $actionIntegration;

    public function __construct(ActionIntegration $actionIntegration)
    {
        $this->actionIntegration = $actionIntegration;
    }

    public function integrationsStatus()
    {
        [$streamlabsIntegration, $streamelementsIntegration] = $this->actionIntegration->getIntegrationsStatus();

        return response()->json([
            'streamlabs' => $streamlabsIntegration,
            'streamelements' => $streamelementsIntegration,
        ]);
    }

    public function initiateAuthorization()
    {
        $authorizationUrl = $this->actionIntegration->initiateAuthorization();

        return response()->json(['authorization_url' => $authorizationUrl]);
    }

    public function searchIntegration(string $service)
    {
        $integration = $this->actionIntegration->getIntegrationByService($service);

        return response()->json($integration);
    }


    public function callback(StreamlabsIntegrationValidation $request)
    {
        try {
            Log::debug('IntegrationController.callback', [$request->all()]);
            $userId = intval($request->input('state'));
            $code = $request->input('code');

            $integrationStatus = $this->actionIntegration->processCallback($userId, $code);

            Log::debug('IntegrationController.callback integrationStatus', [$integrationStatus]);

            $IsNewAccount = $integrationStatus['status'] === 'new_account';

            $statusMessage = $IsNewAccount
                ? 'Integração criada com sucesso.' :
                'Integração já existente, por favor acesse outra conta no Streamlabs';

            $success = $IsNewAccount ? 'true' : 'false';
            return redirect()->to('/integrations/callback?message=' . urlencode($statusMessage) . '&success=' . $success);
        } catch (\Exception $e) {
            Log::critical('IntegrationController.callback error', [$e->getMessage()]);
            return redirect()->to('/integrations/callback?message=' . urlencode('Não foi possível processar a integração. Por favor tente novamente.') . '&success=false');
        }

    }


    public function deleteIntegrationStreamLabs($id)
    {
        try {
            $this->actionIntegration->deleteIntegration($id);

            return response()->json(['success' => 'Integração Deletado com Sucesso!.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Falha ao atualizar o status da integração. Detalhes: ' . $e->getMessage()], 500);
        }
    }

    public function createStreamElements(StreamElemtsValidation $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $integration = $this->actionIntegration->createIntegrationStreamElements($data);

            return response()->json(['user' => $integration], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
