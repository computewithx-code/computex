<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    // Table name (optional, if you follow Laravel convention)
    protected $table = 'compute_sessions';

    // Mass assignable fields
    protected $fillable = [
        'user_id',
        'host_id',
        'name',
        'status',
        'started_at',
        'ended_at',
        'credits_used',
    ];

    // Cast dates to Carbon instances
    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The user who owns this session.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The host machine this session is running on.
     */
    public function host()
    {
        return $this->belongsTo(Host::class);
    }

    /**
     * Helper function: calculate session duration in minutes.
     */
    public function durationInMinutes()
    {
        if ($this->started_at && $this->ended_at) {
            return $this->started_at->diffInMinutes($this->ended_at);
        }
        return 0;
    }
    public function containers()
    {
        return $this->hasMany(Container::class);
    }
}
