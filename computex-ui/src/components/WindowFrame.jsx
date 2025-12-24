import React from "react";

/**
 * Very simple framed window used to show "apps".
 * Not a full draggable window but has window chrome and close.
 */
export default function WindowFrame({ title, children, onClose }) {
  return (
    <div className="bg-white border rounded-md p-2 window-shadow">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-t-md no-select">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-2 font-medium text-slate-700">{title}</div>
        </div>
        <div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-sm">Close</button>
        </div>
      </div>

      <div className="p-3">
        {children}
      </div>
    </div>
  );
}
