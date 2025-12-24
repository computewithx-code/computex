import React from "react";

/**
 * Fake file manager showing sample files & folders
 */
export default function FileManager({ onClose }) {
  const folders = ["Projects", "Assignments", "Downloads"];
  const files = [
    { name: "hello.py", size: "1.2 KB" },
    { name: "report.docx", size: "24 KB" },
    { name: "image.png", size: "120 KB" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">File Manager</div>
        <div className="text-xs text-slate-500">Beginner view</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-semibold mb-2">Folders</div>
          <div className="space-y-2">
            {folders.map((f) => (
              <div key={f} className="p-2 bg-slate-50 rounded flex items-center gap-3">
                <div>📁</div>
                <div className="text-sm">{f}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2">Files</div>
          <div className="space-y-2">
            {files.map((f) => (
              <div key={f.name} className="p-2 bg-white rounded border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>📄</div>
                  <div>
                    <div className="text-sm">{f.name}</div>
                    <div className="text-xs text-slate-400">{f.size}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-indigo-600">Open</button>
                  <button className="text-xs text-slate-500">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button onClick={onClose} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-sm">Close</button>
      </div>
    </div>
  );
}
