<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_id',
        'name',
        'email',
        'document',
        'amount',
        'currency',
        'message',
        'status',
        'callback_data',
        'pix_qrcode',
        'donation_id',
    ];

    protected $casts = [
        'callback_data' => 'json',
        'status' => PaymentStatus::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}