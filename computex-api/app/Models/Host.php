<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Host extends Model
{
    use HasFactory;

    // Table name (optional if you follow Laravel convention)
    protected $table = 'hosts';

    // Mass assignable fields
    protected $fillable = [
        'name',
        'ip_address',
        'status', // online, busy, offline, etc.
        'cpu',
        'memory',
        'disk',
    ];

    /**
     * Sessions running on this host.
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
    public function containers()
{
    return $this->hasMany(Container::class);
}
public function runningSession()
{
    return $this->hasOne(Session::class)
        ->where('status', 'running');
}
public function user()
{
    return $this->belongsTo(User::class);
}
}
