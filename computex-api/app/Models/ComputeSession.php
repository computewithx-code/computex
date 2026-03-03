<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComputeSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'host',
        'status',
        'start_time',
        'end_time'
    ];
}
