import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import WindowFrame from "./components/WindowFrame";
import FileManager from "./components/FileManager";
import Settings from "./components/Settings";
import Terminal from "./components/Terminal";
import SessionStart from "./components/SessionStart";

/**
 * Top-level app: manages which windows are open and global state
 */
export default function App() {
  const [openWindows, setOpenWindows] = useState([]); // {id, title, component}
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  function openWindow(win) {
    setOpenWindows((w) => {
      if (w.find((x) => x.id === win.id)) return w;
      return [...w, win];
    });
  }
  function closeWindow(id) {
    setOpenWindows((w) => w.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen">
      {/* Top navbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center gap-3">
          <div className="text-xl font-semibold">ComputeX Mini OS</div>
          <div className="text-slate-500 text-sm">prototype</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // Save / Export placeholder
              const state = { openWindows, terminalOpen, sessionActive, ts: Date.now() };
              navigator.clipboard?.writeText(JSON.stringify(state, null, 2));
              alert("UI state copied to clipboard (quick export).");
            }}
            className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-sm"
          >
            Save / Export
          </button>

          <a
            className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            href="sandbox:/mnt/data/fyp prop.pdf"
            target="_blank"
            rel="noreferrer"
            title="Open uploaded proposal"
          >
            Open Proposal
          </a>
        </div>
      </div>

      {/* Main area */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left column: Dashboard and quick actions */}
          <div className="md:col-span-1">
            <Dashboard
              onOpenFileManager={() => openWindow({ id: "file", title: "File Manager", component: <FileManager onClose={() => closeWindow("file")} /> })}
              onOpenSettings={() => openWindow({ id: "settings", title: "Settings", component: <Settings onClose={() => closeWindow("settings")} /> })}
              onOpenSession={() => openWindow({ id: "session", title: "Session", component: <SessionStart onStart={() => { setSessionActive(true); closeWindow("session"); }} onClose={() => closeWindow("session")} /> })}
              onToggleTerminal={() => setTerminalOpen((t) => !t)}
            />
          </div>

          {/* Right column: work area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg p-6 window-shadow min-h-[320px]">
              <div className="text-slate-700 font-medium mb-3">Workspace</div>

              {sessionActive ? (
                <div className="border rounded p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">Session Active • Demo Host: lab-machine-01</div>
                    <button
                      onClick={() => setSessionActive(false)}
                      className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                    >
                      End Session
                    </button>
                  </div>

                  <div className="mt-4 text-sm text-slate-600">
                    This is a simulated session area — in the real system you would see a streaming desktop (noVNC/WebRTC).
                  </div>
                </div>
              ) : (
                <div className="text-slate-500">
                  No session active. Click <span className="font-medium">Start Session</span> in the Dashboard to begin.
                </div>
              )}

              {/* Render windows */}
              <div className="mt-4 space-y-3">
                {openWindows.length === 0 && (
                  <div className="text-sm text-slate-400">Open an app from the left to see a window.</div>
                )}

                {openWindows.map((w) => (
                  <WindowFrame key={w.id} title={w.title} onClose={() => closeWindow(w.id)}>
                    {w.component}
                  </WindowFrame>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Terminal */}
      {terminalOpen && (
        <Terminal onClose={() => setTerminalOpen(false)} />
      )}

      {/* Footer */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <div className="bg-white p-2 rounded-full shadow-md text-sm px-4">
          ComputeX Prototype • {sessionActive ? "Session running" : "Idle"}
        </div>
      </div>
    </div>
  );
}
