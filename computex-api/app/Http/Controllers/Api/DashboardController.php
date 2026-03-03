<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Credit;
use App\Models\Session;
use App\Models\Container;

class DashboardController extends Controller
{
    public function summary()
    {
        $userId = auth()->id() ?? 1; // Use proper auth in production

        // -------- Credits --------
        $credit = Credit::firstOrCreate(
            ['user_id' => $userId],
            ['balance' => 0, 'used' => 0, 'monthly_limit' => 100]
        );

        $percentage = $credit->monthly_limit > 0
            ? round(($credit->used / $credit->monthly_limit) * 100, 2)
            : 0;

        $remaining = $credit->balance - $credit->used;

        $creditsData = [
            'balance' => $credit->balance,
            'used' => $credit->used,
            'monthly_limit' => $credit->monthly_limit,
            'percentage' => $percentage,
            'remaining' => $remaining > 0 ? $remaining : 0
        ];

        // -------- Sessions --------
        $sessions = Session::with('host') // fetch host info
            ->where('user_id', $userId)
            ->orderBy('started_at', 'desc')
            ->get();

        // Used this week (example: sum credits_used of sessions started this week)
        $usedThisWeek = $sessions->filter(function($s){
            return $s->started_at && $s->started_at->isCurrentWeek();
        })->sum('credits_used');

        // Active sessions count
        $activeSessions = $sessions->where('status', 'running')->count();

        // -------- Containers linked to sessions --------
        $containers = Container::whereIn('session_id', $sessions->pluck('id'))
            ->get();

        $containersRunning = $containers->where('status', 'running')->count();

        // -------- Recent sessions for display --------
        $recentSessions = $sessions->take(5)->map(function($s){
            return [
                'id' => $s->id,
                'host' => $s->host?->name ?? 'Unknown',
                'duration' => $s->ended_at && $s->started_at
                    ? $s->started_at->diffInMinutes($s->ended_at) . ' mins'
                    : null,
                'status' => $s->status
            ];
        });

        // -------- Notifications (example, you can fetch real ones later) --------
        $notifications = [
            'Session started successfully',
            'Credits updated'
        ];

        // -------- Response JSON --------
        return response()->json([
            'credits' => $creditsData,
            'used_this_week' => $usedThisWeek,
            'active_sessions' => $activeSessions,
            'containers_running' => $containersRunning,
            'notifications' => $notifications,
            'recent_sessions' => $recentSessions
        ]);
    }


    // Optional: Top-up method
    public function topUp(Request $request)
    {
        $request->validate([
            'amount' => 'required|integer|min:1|max:1000'
        ]);

        $credit = Credit::firstOrCreate(
            ['user_id' => auth()->id() ?? 1],
            ['balance' => 0, 'used' => 0, 'monthly_limit' => 100]
        );

        $credit->balance += $request->amount;
        $credit->save();

        return response()->json([
            'message' => 'Credits added successfully',
            'balance' => $credit->balance
        ]);
    }
}
