<?php

namespace App\Http\Controllers;

use App\Actions\PaymentAction;
use App\Http\Requests\DonationValidation;
use App\Jobs\DispatchWidgetEvent;
use App\Models\Widget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SmartFastPayController extends Controller
{
    public function __construct(protected readonly PaymentAction $paymentAction)
    {}

    public function makePayment(DonationValidation $request)
    {
        try {
            $paymentResponse = $this->paymentAction->store($request);

            return response()->json($paymentResponse);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function callback(Request $request)
    {
        try {
            Log::debug(__CLASS__ . '.' . __FUNCTION__ . ' - webhook payload: ', [$request->getContent()]);

            $this->paymentAction->callback($request);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro interno no servidor'], 500);
        }
    }

    public function eventStress(Request $request)
    {
        foreach (Widget::all() as $widget) {
            if ($widget->type === 'alert') {
                $donationData = [
                    'skip_alert' => 'no',
                    'name' => Str::random(10),
                    'message' => Str::random(20),
                    'identifier' => Str::uuid(),
                    'amount' => rand(1, 1000),
                    'currency' => 'BRL',
                ];
                $donationData['transaction_id'] = Str::uuid();

                DispatchWidgetEvent::dispatch($widget, $donationData)->delay(now()->addSeconds(30));
            }
        }

        return response()->json(['success' => true]);
    }
}