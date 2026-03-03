<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Host;

class HostController extends Controller
{
    // Return all active hosts
    public function activeHosts()
    {
        // Consider 'online' and 'busy' as active
        $activeHosts = Host::whereIn('status', ['online', 'busy'])->get();

        return response()->json([
            'active_hosts' => $activeHosts
        ]);
    }
    public function index()
{
    $hosts = Host::with('runningSession.user')
        ->select('id', 'name', 'status', 'cpu', 'ram')
        ->get();

    return response()->json($hosts);
}
}
