import React from "react";

/**
 * Tiny settings panel
 */
export default function Settings({ onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">Settings</div>
        <div className="text-xs text-slate-500">Simple mode</div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
          <div>
            <div className="font-medium">Sound</div>
            <div className="text-xs text-slate-500">System audio for sessions</div>
          </div>
          <div>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
          <div>
            <div className="font-medium">Bluetooth input</div>
            <div className="text-xs text-slate-500">Enable keyboard/mouse passthrough</div>
          </div>
          <div>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="font-medium">Display</div>
          <div className="text-xs text-slate-500">Scale and brightness presets</div>
          <div className="mt-2 flex gap-2">
            <button className="px-2 py-1 bg-white rounded border text-xs">Mobile</button>
            <button className="px-2 py-1 bg-white rounded border text-xs">Tablet</button>
            <button className="px-2 py-1 bg-white rounded border text-xs">Desktop</button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button onClick={onClose} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-sm">Done</button>
      </div>
    </div>
  );
}
