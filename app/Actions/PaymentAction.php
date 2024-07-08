<?php

namespace App\Actions;

use App\Library\SignatureLibrary;
use Exception;
use App\Models\Payment;
use App\Services\Smartfastpay\SmartFastPayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentAction
{

    public function __construct(
      protected readonly SmartFastPayService $smartFastPayService, 
      protected readonly Payment $payment,
      protected readonly ActionUser $actionUser
    ) {}

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->except('slug');

            $response = $this->smartFastPayService->makePayment($data);

            Log::debug(__CLASS__ . '.' . __FUNCTION__ . ' - response', [$response]);

            $user = $this->actionUser->getUserBySlug($request->input('slug'));
            
            $data['transaction_id'] = $response['data']['id'];
            $data['pix_qrcode'] = $response['data']['pix']['qrcode'];
            $data['user_id'] = $user->id;

            Log::debug(__CLASS__ . '.' . __FUNCTION__ . ' - data', [$data]);
            
            $this->payment->create($data);

            DB::commit();

            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            Log::critical(__CLASS__ . '.' . __FUNCTION__ . ' - error', [$e->getMessage()]);
            throw $e;
        }
    }

    public function callback(Request $request)
    {
        try {
            $headerKey = $request->header('SmartFastPay-Signature');

            Log::debug(__CLASS__ . '.' . __FUNCTION__ . 'SmartFastPay Signature: ' . print_r(json_encode($headerKey), true));

            if (empty($headerKey)) {
                Log::info('SmartFastPay Signature is null');
                return;
            }

            $data = $request->all();

            Log::debug(__CLASS__ . '.' . __FUNCTION__ . ' - webhook payload: ', [$data]);
    
            $reqTimestamp = explode('=', explode(',', $headerKey)[0])[1];
            $reqSignature = explode('=', explode(',', $headerKey)[1])[1];
            $secret = config('smartfastpay.secret');
    
            if (!(new SignatureLibrary())->validate($reqTimestamp, $data, $reqSignature, $secret)) {
                Log::info('SmartFastPay Signature is not valid');
                return;
            }

            $this->smartFastPayService->callbackService($data);

            return true;
        } catch (Exception $e) {
            Log::critical(__CLASS__ . '.' . __FUNCTION__ . ' - error', [$e->getMessage()]);
            throw $e;
        }
    }
}