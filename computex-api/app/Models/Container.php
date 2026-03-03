<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    protected $fillable = [
        'host_id',
        'session_id',
        'name',
        'status',
        'started_at',
        'stopped_at',
        'cpu_usage',
        'memory_usage'
    ];

    public function host()
    {
        return $this->belongsTo(Host::class);
    }

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    // Access user via session
    public function user()
    {
        return $this->session->user();
    }
}



