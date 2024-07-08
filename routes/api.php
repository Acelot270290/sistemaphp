<?php

use App\Http\Controllers\IntegrationController;
use App\Http\Controllers\SmartFastPayController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WidgetController;
use App\Http\Controllers\StreamlabsController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Routes test
Route::get('/test/logs', [TestController::class, 'testLogs']);
Route::get('/test/exceptions', [TestController::class, 'testExceptions']);
Route::get('/test/storage', [TestController::class, 'testStoragePath']);
Route::get('/test/database', [TestController::class, 'testDatabaseConnection']);
Route::get('/test/base64-encode', [TestController::class, 'base64Encode']);
Route::get('/test/base64-decode', [TestController::class, 'base64Decode']);

// Auth user
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login.api');
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('password/email',[AuthController::class, 'sendResetLinkEmail']);
Route::post('password/reset', [AuthController::class, 'resetPassword']);
Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verify'])->name('verification.verify');

// User
Route::get('/user-by-slug/{slug}', [UserController::class, 'getUserBySlug']);

// API StreamLabs
Route::post('/token', [StreamlabsController::class, 'getToken']);
Route::get('/donations/{slug}', [StreamlabsController::class, 'Donations'])->name('donations.api');
Route::get('/last-donations/{slug}', [StreamlabsController::class, 'getLastDonation'])->name('last-donations.api');
Route::post('/alerts', [StreamlabsController::class, 'alerts']);
Route::get('/users/{slug}', [StreamlabsController::class, 'users']);
Route::get('/ranking-donations/{slug}', [StreamlabsController::class, 'getRankingDonation']);
Route::get('/meta-donations/{slug}', [StreamlabsController::class, 'metaDonations']);


// API Smartfastpay
Route::post('/payment', [SmartFastPayController::class, 'makePayment']);
Route::post('/payment/notification', [SmartFastPayController::class, 'callback']);
Route::get('/get-webhook-data', [SmartFastPayController::class, 'getWebhookData']);

// Widgets
Route::get('/widgets/{template}', [WidgetController::class, 'show']);
Route::get('/embed-qrcode/{template}', [WidgetController::class, 'showQRCode'])->name('api.widget.qrcode.show');

// Integrations
Route::get('/integrations/authorize', [IntegrationController::class, 'authorizeStreamlabs'])->name('integration.authorize');
Route::get('/integrations/callback', [IntegrationController::class, 'callback'])->name('integration.callback');
Route::delete('/integrations/{id}', [IntegrationController::class, 'deleteIntegrationStreamLabs'])->name('integrations.updateStatus');

// Authentication
Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::get('/integrations/{service}/search', [IntegrationController::class, 'searchIntegration']);
    Route::get('/integrations/initiate', [IntegrationController::class, 'initiateAuthorization'])->name('integrations.initiate');
    Route::get('/integrations/status', [IntegrationController::class, 'integrationsStatus']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('login.logout');
    Route::get('/widgets', [WidgetController::class, 'index']);
    Route::post('/widgets', [WidgetController::class, 'store']);
    Route::put('/widgets/{widget}', [WidgetController::class, 'update']);
    Route::patch('/widgets/{widget}', [WidgetController::class, 'update']);
    Route::delete('/widgets/{id}', [WidgetController::class, 'destroy']);
    Route::post('/widgets/trigger-event/{template}', [WidgetController::class, 'triggerAlert']);
});

//Notifications
Route::post('/event/stress', [SmartFastPayController::class, 'eventStress']);