<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlertsValidation;
use App\Http\Requests\DonationValidation;
use App\Models\User;
use App\Services\Streamlabs\StreamlabsService;
use Illuminate\Http\Request;

class StreamlabsController extends Controller
{
    private StreamlabsService $streamlabsService;
    private User $user;

    public function __construct(StreamlabsService $streamlabsService, User $user)
    {
        $this->user = $user;
        $this->streamlabsService = $streamlabsService;
    }

    public function users(Request $request)
    {
        $accessToken = $request->header('Authorization');

        $accessToken = str_replace('Bearer ', '', $accessToken);

        $serviceId = $this->streamlabsService->getServiceIdByUser($accessToken);

        return response()->json(['service_id' => $serviceId]);
    }

    public function donations($slug)
    {
        try {
            $response = $this->streamlabsService->Donations($slug);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function getLastDonation($slug)
    {
        try {
            $response = $this->streamlabsService->getLastDonation($slug);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function getRankingDonation($slug)
    {
        try {
            $response = $this->streamlabsService->getRankingDonation($slug);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function metaDonations($slug)
{
    try {
        $user = User::where('slug', $slug)->firstOrFail();
        $widget = $user->widgets()->where('type', 'meta')->firstOrFail();

        $startTime = $widget->created_at->format('Y-m-d H:i:s');
        $updateTime = $widget->updated_at->format('Y-m-d H:i:s');

        if ($updateTime != $startTime) {
            $startTime = $updateTime;
        }

        $response = $this->streamlabsService->Donations($slug);
        $donations = $response['data'];


        $variations = json_decode($widget->variations, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('Invalid JSON in widget variations', 500);
        }

        if (!isset($variations[0]['config'])) {
            throw new \Exception('Config key not found in widget variations', 500);
        }

        $config = $variations[0]['config'];


        $goalAmount = $config['targetAmount'] ?? 0;
        $endDateStr = $config['endDate'] ?? null;
        if ($endDateStr === null) {
            throw new \Exception('End date not specified in widget config', 500);
        }
        $endDate = new \DateTime($endDateStr);


        $totalDonations = 0;
        foreach ($donations as $donation) {
            $donationTime = (new \DateTime())->setTimestamp($donation['created_at']);
            if ($donationTime >= new \DateTime($startTime) && $donationTime <= $endDate) {
                $totalDonations += (float) $donation['amount'];
            }
        }

        $goalAchieved = $totalDonations >= $goalAmount;

        return response()->json([
            'total_donations' => $totalDonations,
            'goal_amount' => $goalAmount,
            'goal_achieved' => $goalAchieved,
            'start_time' => $startTime,
            'end_time' => $endDate->format('Y-m-d H:i:s')
        ]);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['error' => 'User or Widget not found'], 404);
    } catch (\Exception $e) {
        $statusCode = $e->getCode() ?: 500;
        return response()->json(['error' => $e->getMessage()], (int) $statusCode);
    }
}


    public function alerts(AlertsValidation $request)
    {
        try {
            $data = $request->validated();
            $response = $this->streamlabsService->Alerts($data);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
