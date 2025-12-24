import React, { useState } from "react";

/**
 * Fake terminal overlay
 */
export default function Terminal({ onClose }) {
  const [history, setHistory] = useState(["Welcome to ComputeX Terminal — type `help`"]);
  const [cmd, setCmd] = useState("");

  function runCommand() {
    if (!cmd.trim()) return;
    setHistory((h) => [...h, `> ${cmd}`, `> (sim) Output for "${cmd}"`]);
    setCmd("");
  }

  return (
    <div className="fixed right-6 bottom-6 w-[520px] window-shadow rounded overflow-hidden">
      <div className="bg-slate-800 text-white p-2 flex items-center justify-between">
        <div className="text-sm">Terminal</div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="text-xs text-white/80">Close</button>
        </div>
      </div>

      <div className="p-3 bg-black text-white text-xs font-mono h-48 overflow-auto">
        {history.map((l, i) => (
          <div key={i} className={l.startsWith(">") ? "text-slate-300" : ""}>{l}</div>
        ))}
      </div>

      <div className="p-3 bg-slate-900 flex items-center gap-2">
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runCommand()}
          placeholder="Type a command (e.g., help, ls, ping)"
          className="flex-1 px-3 py-2 rounded bg-slate-800 text-white text-xs font-mono"
        />
        <button onClick={runCommand} className="px-3 py-2 bg-indigo-600 text-white rounded text-xs">Run</button>
      </div>
    </div>
  );
}
