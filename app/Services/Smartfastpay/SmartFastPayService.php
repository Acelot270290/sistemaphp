<?php

namespace App\Services\Smartfastpay;

use Exception;
use App\Clients\SmartFastPayClients;
use App\Events\CallbackEvent;
use App\Jobs\DispatchWidgetEvent;
use App\Mail\DonationReceived;
use App\Models\Payment;
use App\Services\Streamlabs\StreamlabsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SmartFastPayService
{
    public function __construct(
        protected readonly SmartFastPayClients $smartfastpayclient,
        protected readonly StreamlabsService $streamlabsService,
        protected readonly Payment $payment
    ) {
    }

    public function getAccessToken()
    {
        return $this->smartfastpayclient->getAccessToken();
    }

    public function makePayment($paymentData)
    {
        return $this->smartfastpayclient->makePayment($paymentData);
    }

    public function callbackService(array $data)
    {
        Log::info(__CLASS__ . '.' . __FUNCTION__ . ' - Start processing callback webhook');

        DB::beginTransaction();

        try {
            if (!empty($data['data']) && is_array($data['data'])) {
                $data = current($data['data']);

                $payment = $this->payment->with('user')->where('transaction_id', $data['id'])->firstOrFail();

                if (isset($data['status']) && $data['status'] === 'paid' && $payment->status->isPending()) {
                    $this->processPaidTransaction($payment, $data);
                } else {
                    $this->processUnpaidTransaction($payment, $data);
                }

                event(new CallbackEvent($data, $data['id']));
            }

            Log::info(__CLASS__ . '.' . __FUNCTION__ . ' - End processing callback webhook');

            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error(__CLASS__ . '.' . __FUNCTION__ . ' - End processing callback webhook', [$e->getMessage()]);
            throw $e;
        }
    }

    protected function processPaidTransaction(Payment $payment, array $paymentData)
    {
        $donationData = [
            'skip_alert' => 'no',
            'name' => $payment->name,
            'message' => $payment->message,
            'identifier' => $payment->email,
            'amount' => (float) $payment->amount,
            'currency' => $payment->currency
        ];

        $response = $this->streamlabsService->postDonation($donationData, $payment->user);

        $payment->update([
            'status' => $paymentData['payment_status'], 
            'callback_data' => json_encode($paymentData),
            'donation_id' => $response['donation_id']
        ]);

        $this->sendDonationEventAndMail($payment, $donationData);
    }

    protected function processUnpaidTransaction(Payment $payment, array $paymentData)
    {
        $payment->update([
            'status' => $paymentData['payment_status'], 
            'callback_data' => json_encode($paymentData)
        ]);
    }

    protected function sendDonationEventAndMail(Payment $payment, array $donationData)
    {
        foreach ($payment->user->widgets as $widget) {
            $donationData['transaction_id'] = $payment->transaction_id;
            DispatchWidgetEvent::dispatch($widget, $donationData)->delay(now()->addSeconds(30));
        }

        Mail::to($payment->user->email)->send(new DonationReceived($donationData));
    }
}