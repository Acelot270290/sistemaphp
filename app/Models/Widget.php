<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'type', 'name', 'status', 'variations', 'hidden', 'template', 'url_embed', 'created_at', 'updated_at'
    ];

    public $timestamps = true;

    protected $casts = [
        'variations' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}