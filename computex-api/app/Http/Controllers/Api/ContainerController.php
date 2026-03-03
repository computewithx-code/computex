<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Container;
use App\Models\Session;
use App\Models\Host;

class ContainerController extends Controller
{
    /**
     * Get all active containers (running).
     */
    public function active()
{
    $containers = Container::with([
            'host:id,name,status',
            'session:id,user_id,started_at',
            'session.user:id,name'
        ])
        ->whereHas('session', function($q){
            $q->whereIn('status', ['running', 'open']); // only active sessions
        })
        ->whereIn('status', ['running', 'starting']) // container must also be running
        ->get();

    return response()->json([
        'containers' => $containers
    ]);
}


    public function start(Request $request)
    {
        $request->validate([
            'host_id' => 'required|exists:hosts,id',
            'session_id' => 'required|exists:compute_sessions,id',
            'name' => 'required|string|max:255'
        ]);

        $container = Container::create([
            'host_id' => $request->host_id,
            'session_id' => $request->session_id,
            'name' => $request->name,
            'status' => 'running',
            'started_at' => now(),
            'cpu_usage' => 0,
            'memory_usage' => 0
        ]);

        return response()->json([
            'message' => 'Container started successfully',
            'container' => $container->load('host', 'session.user')
        ], 201);
    }

    /**
     * Stop a running container
     */
    public function stop($id)
{
    try {
        $userId = auth()->id() ?? 1;

        // Fetch session with host safely
        $session = Session::with('host')->where('id', $id)->where('user_id', $userId)->first();

        if (!$session) {
            return response()->json([
                'message' => 'Session not found'
            ], 404);
        }

        // Check if already stopped
        if ($session->status === 'stopped') {
            return response()->json([
                'message' => 'Session already stopped'
            ], 400);
        }

        // Mark end time
        $session->ended_at = now();

        // Calculate duration safely (minutes)
        $durationMinutes = 0;
        if ($session->started_at) {
            $durationMinutes = $session->started_at->diffInMinutes($session->ended_at);
        }

        // Calculate credits: 1 credit per 5 minutes
        $creditsUsed = ceil($durationMinutes / 5);

        // Update session fields
        $session->credits_used = $creditsUsed;
        $session->status = 'stopped';
        $session->save();

        // Deduct user credits safely
        $credit = Credit::where('user_id', $userId)->first();
        if ($credit) {
            $credit->used += $creditsUsed;
            $credit->balance = max(0, $credit->balance - $creditsUsed);
            $credit->save();
        }

        // Free host if exists
        if ($session->host) {
            $session->host->status = 'online';
            $session->host->save();
        }

        return response()->json([
            'message' => 'Session stopped successfully',
            'session' => $session->load('host') // send updated host for frontend
        ], 200);

    } catch (\Exception $e) {
        // Return full error message for debugging
        return response()->json([
            'message' => 'Server Error',
            'error' => $e->getMessage()
        ], 500);
    }
}

}

