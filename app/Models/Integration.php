<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service',
        'access_token',
        'id_client',
        'service_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
