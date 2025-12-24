import React from "react";

/**
 * Simple dashboard with app icons and quick actions
 */
export default function Dashboard({ onOpenFileManager, onOpenSettings, onOpenSession, onToggleTerminal }) {
  return (
    <div className="bg-white p-4 rounded-lg window-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="text-xs text-slate-500">Novice View</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button onClick={onOpenFileManager} className="flex flex-col items-center gap-2 p-2">
          <div className="app-icon bg-sky-100 text-sky-700">📁</div>
          <div className="text-xs text-slate-600">Files</div>
        </button>

        <button onClick={onOpenSettings} className="flex flex-col items-center gap-2 p-2">
          <div className="app-icon bg-amber-100 text-amber-700">⚙️</div>
          <div className="text-xs text-slate-600">Settings</div>
        </button>

        <button onClick={onOpenSession} className="flex flex-col items-center gap-2 p-2">
          <div className="app-icon bg-indigo-100 text-indigo-700">🖥️</div>
          <div className="text-xs text-slate-600">Start Session</div>
        </button>

        <button onClick={onToggleTerminal} className="flex flex-col items-center gap-2 p-2">
          <div className="app-icon bg-green-100 text-green-700">_</div>
          <div className="text-xs text-slate-600">Terminal</div>
        </button>

        <div className="flex flex-col items-center gap-2 p-2 opacity-60">
          <div className="app-icon bg-slate-100 text-slate-500">🔍</div>
          <div className="text-xs text-slate-400">Search</div>
        </div>

        <div className="flex flex-col items-center gap-2 p-2 opacity-60">
          <div className="app-icon bg-slate-100 text-slate-500">🧾</div>
          <div className="text-xs text-slate-400">Reports</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Quick actions for beginners — minimal choices so nothing is confusing.
      </div>
    </div>
  );
}
