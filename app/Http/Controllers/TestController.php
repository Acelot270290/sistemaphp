<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    public function testLogs():object
    {
        $error = 'TestErrorReportingLevel';
        Log::emergency($error);
        Log::alert($error);
        Log::critical($error);
        Log::error($error);
        Log::warning($error);
        Log::notice($error);
        Log::info($error);
        Log::debug($error);

        return response()->json([
            'Environment' => env('APP_ENV'),
            'Log Channel' => env('LOG_CHANNEL'),
            'Log Level' => env('LOG_LEVEL'),
            'Debug' => env('APP_DEBUG'),
            'TimeZone' => env('APP_TIMEZONE')
        ], 200);
    }

    public function testExceptions():object
    {
        $error = 'TestExceptionLog';
        throw new \InvalidArgumentException($error);
    }

    public function testStoragePath():object
    {
        return response()->json([
            'storage' => storage_path()
        ], 200);
    }

    public function testDatabaseConnection():object
    {
        try {
            $results = DB::select('SELECT 123 as abc');
        } catch (Exception $e) {
            $results = [
                'error' => true,
                'message' => $e->getMessage()
            ];
        }
        return response()->json([
            'results' => $results
        ], 200);
    }

    public function base64Encode(Request $request)
    {
        return response()->json([
            'result' => base64_encode(json_encode($request->all()))
        ], 200);
    }

    public function base64Decode(Request $request)
    {
        return response()->json([
            'result' => json_decode(base64_decode($request->input('data')), true)
        ], 200);
    }
}