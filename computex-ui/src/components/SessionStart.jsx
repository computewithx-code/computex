import React, { useState } from "react";

/**
 * Fake session start flow that simulates host selection and starting a session.
 */
export default function SessionStart({ onStart, onClose }) {
  const [selected, setSelected] = useState(null);
  const hosts = [
    { id: "lab-01", name: "lab-machine-01", latency: "12ms", load: "light" },
    { id: "lab-02", name: "lab-machine-02", latency: "25ms", load: "med" },
    { id: "host-ext", name: "external-host-01", latency: "120ms", load: "light" },
  ];

  return (
    <div>
      <div className="mb-3">
        <div className="font-medium">Start Session</div>
        <div className="text-xs text-slate-500">Pick a host — we’ll auto-provision an ephemeral desktop.</div>
      </div>

      <div className="space-y-2">
        {hosts.map((h) => (
          <div key={h.id} className={`p-3 border rounded flex items-center justify-between ${selected === h.id ? "bg-indigo-50 border-indigo-200" : "bg-white"}`}>
            <div>
              <div className="font-medium">{h.name}</div>
              <div className="text-xs text-slate-500">{h.latency} • load: {h.load}</div>
            </div>
            <div>
              <input type="radio" name="host" checked={selected === h.id} onChange={() => setSelected(h.id)} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">Tip: choose local lab machines for best performance.</div>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-slate-100 text-sm">Cancel</button>
          <button
            onClick={() => {
              if (!selected) return alert("Please select a host.");
              // simulate provisioning time
              alert("Provisioning session on " + selected + " (simulated)");
              onStart();
            }}
            className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
          >
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
