<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Session;
use App\Models\Host;
use App\Models\Credit;
use App\Models\Container;

class SessionController extends Controller
{
    /**
     * Start a new session
     */
    public function start(Request $request)
    {
        $userId = auth()->id() ?? 1; // replace properly when auth fully enabled

        // Check user credits
        $credit = Credit::where('user_id', $userId)->first();
        if (!$credit || $credit->balance <= 0) {
            return response()->json([
                'message' => 'Insufficient credits'
            ], 400);
        }

        // Find available host
        $host = Host::where('status', 'online')->first();
        if (!$host) {
            return response()->json([
                'message' => 'No host available'
            ], 400);
        }

        // Mark host as busy
        $host->status = 'busy';
        $host->save();

        // Create session
        $session = Session::create([
            'user_id'      => $userId,
            'host_id'      => $host->id,
            'name'         => 'Compute Session',
            'status'       => 'running',
            'started_at'   => now(),
            'credits_used' => 0
        ]);

        // Create container for this session
        $container = Container::create([
            'session_id' => $session->id,
            'host_id'    => $host->id,
            'name'       => $host->name . ' Container-' . rand(1, 100),
            'status'     => 'running',
            'cpu_usage'  => 0,
            'memory_usage' => 0,
            'started_at' => now()
        ]);

        return response()->json([
            'message'   => 'Session started successfully',
            'session'   => $session,
            'container' => $container,
            'host'      => $host
        ]);
    }

   
   public function stop($id)
{
    try {
        $userId = auth()->id() ?? 1;

        // Fetch session with host
        $session = Session::with('host')->where('id', $id)->where('user_id', $userId)->first();

        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }

        if ($session->status === 'stopped') {
            return response()->json(['message' => 'Session already stopped'], 400);
        }

        // End the session
        $session->ended_at = now();
        $durationMinutes = $session->started_at ? $session->started_at->diffInMinutes($session->ended_at) : 0;
        $creditsUsed = ceil($durationMinutes / 5);

        $session->credits_used = $creditsUsed;
        $session->status = 'stopped';
        $session->save();

        // Update user credits
        $credit = Credit::where('user_id', $userId)->first();
        if ($credit) {
            $credit->used += $creditsUsed;
            $credit->balance = max(0, $credit->balance - $creditsUsed);
            $credit->save();
        }

        // Free host
        if ($session->host) {
            $session->host->status = 'online';
            $session->host->save();
        }

        // Prepare updated credits data
        $creditsData = [
            'balance' => $credit->balance,
            'used' => $credit->used,
            'monthly_limit' => $credit->monthly_limit,
            'percentage' => $credit->monthly_limit > 0
                ? round(($credit->used / $credit->monthly_limit) * 100, 2)
                : 0,
            'remaining' => max(0, $credit->balance - $credit->used)
        ];

        return response()->json([
            'message' => 'Session stopped successfully',
            'session' => $session->load('host'),
            'credits' => $creditsData
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Server Error',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
