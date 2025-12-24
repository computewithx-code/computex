import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./dashboard.css";

// ---------- Mock data ----------
const mock = {
  credits: { balance: 120, usedThisWeek: 34, limit: 500 },
  sessions: [
    { id: 1, title: "Frontend Build", status: "Running", started: "2m ago" },
    { id: 2, title: "Data Analysis", status: "Completed", started: "1h ago" },
    { id: 3, title: "VM Install", status: "Failed", started: "3h ago" },
    { id: 4, title: "CS Lab", status: "Completed", started: "yesterday" },
  ],
  containers: [
    { id: "c-01", name: "ubuntu-dev", cpu: 24, mem: 36, status: "running" },
    { id: "c-02", name: "node-builder", cpu: 8, mem: 12, status: "running" },
    { id: "c-03", name: "db-postgres", cpu: 2, mem: 6, status: "idle" },
  ],
  notifications: [
    { id: 1, type: "info", text: "New host available in Lab 3" },
    { id: 2, type: "warning", text: "Credit balance low: consider topping up" },
  ],
};

// ---------- Icons ----------
const IconCredit = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    <path d="M12 15v.01" />
  </svg>
);

const IconPlay = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 3v18l15-9L5 3z" />
  </svg>
);

const IconContainer = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

// ---------- Helpers ----------
const statusColor = (status) => {
  switch (status) {
    case "Running":
    case "running":
      return "bg-emerald-400 text-white";
    case "Completed":
    case "idle":
      return "bg-sky-500 text-white";
    case "Failed":
      return "bg-rose-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

// ---------- FIXED Sidebar (Narrower width) ----------
function Sidebar({ open, onClose, theme }) {
  const isDark = theme === "dark";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity sm:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`
          fixed top-0 left-0 z-[1000] sm:z-50
          h-screen
          w-48 sm:w-64
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
          ${
            isDark
              ? "bg-[#020921] text-slate-100"
              : "bg-white text-slate-900 border-r border-slate-200 shadow-md"
          }
        `}
      >
        <div className="flex-1 flex flex-col px-3 py-4">
          <div className="flex items-center justify-between h-12">
            <div className="text-xl font-extrabold tracking-tight">CX</div>
            <button
              onClick={onClose}
              className="sm:hidden text-slate-400 text-xl"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-1.5 mt-4">
            {[
              { key: "dashboard", label: "Dashboard", icon: <IconContainer /> },
              { key: "sessions", label: "Sessions", icon: <IconPlay /> },
              { key: "hosts", label: "Hosts", icon: <IconContainer /> },
              { key: "billing", label: "Billing", icon: <IconCredit /> },
            ].map((it) => {
              const isActive = it.key === "sessions";
              return (
                <button
                  key={it.key}
                  className={`
                    group w-full flex items-center gap-2 px-2 py-1.5 rounded-lg
                    text-xs font-medium
                    transition
                    ${
                      isDark
                        ? isActive
                          ? "bg-[#0d1021] border border-white/5"
                          : "hover:bg-white/5"
                        : isActive
                        ? "bg-slate-100 border border-slate-200"
                        : "hover:bg-slate-50"
                    }
                  `}
                >
                  <div
                    className={`
                      p-1.5 rounded-md w-8 h-8 flex items-center justify-center
                      ${
                        isDark
                          ? "bg-white/5 text-sky-400"
                          : "bg-slate-100 text-sky-500"
                      }
                    `}
                  >
                    {it.icon}
                  </div>
                  <span className="truncate">{it.label}</span>
                </button>
              );
            })}
          </nav>

          <div
            className={`mt-auto text-xs ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            v0.1 • prototype
          </div>
        </div>
      </aside>
    </>
  );
}

// ---------- Topbar ----------
function Topbar({ onMenuClick, theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header
      className={`
        sticky top-0 z-20
        flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4
        px-3 sm:px-4 sm:px-6 py-3
        border-b
        ${
          isDark
            ? "border-white/5 bg-[#020a1c]"
            : "border-slate-200 bg-white shadow-sm"
        }
      `}
    >
      <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
        <button
          onClick={onMenuClick}
          className="sm:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition text-xl"
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="flex-1 min-w-0">
          <input
            placeholder="search sessions, hosts, container"
            className={`
              w-full text-sm px-3 py-2.5 rounded-2xl border
              focus:outline-none focus:ring-2
              ${
                isDark
                  ? "bg-[#020921] text-slate-100 placeholder:text-slate-500 border-sky-500/40 focus:ring-sky-500/60"
                  : "bg-slate-50 text-slate-800 placeholder:text-slate-400 border-slate-300 focus:ring-sky-500/40"
              }
            `}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          className={`text-lg p-1 ${
            isDark ? "text-slate-200" : "text-slate-500"
          }`}
        >
          🔔
        </button>

        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className={`
              p-1.5 sm:p-2 rounded-full border transition
              ${
                isDark
                  ? "bg-[#020921] border-white/10 hover:bg-white/10"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }
            `}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        )}

        <div className="w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
          S
        </div>
      </div>
    </header>
  );
}

// ---------- Cards (All with fixed text colors) ----------
function CreditsCard({ credits }) {
  const percent = Math.min(100, Math.round((credits.balance / credits.limit) * 100));
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl p-5 bg-gradient-to-r from-blue-900 to-purple-900/80 shadow-lg overflow-hidden">
      <div className="absolute -right-20 -top-10 opacity-20 w-72 h-72 rounded-full bg-gradient-to-tr from-white/10 to-white/5 blur-3xl"></div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white/6">
            <IconCredit className="w-8 h-8 text-yellow-300" />
          </div>

          <div>
            <div className="text-xs text-slate-300">Credits</div>
            <div className="text-2xl font-bold text-white">{credits.balance}</div>
            <div className="text-xs text-slate-400">Used this week: {credits.usedThisWeek}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 36 36" className="w-20 h-20">
              <defs>
                <linearGradient id="g" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#111827" strokeWidth="6" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="url(#g)" strokeWidth="6" strokeDasharray={`${percent} ${100 - percent}`} strokeDashoffset="25" strokeLinecap="round" transform="rotate(-90 18 18)" />
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="text-sm" fill="#fff" style={{ fontSize: 9 }}>{percent}%</text>
            </svg>
            <div className="text-xs text-slate-300 mt-2">of monthly limit</div>
          </div>

          <div>
            <button className="px-4 py-2 bg-white/6 rounded-lg hover:scale-105 transition transform">Top up</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}




function SessionsCard({ sessions, theme }) {
  const isDark = theme === "dark";
  return (
    <div
      className={`
        rounded-3xl p-3 sm:p-4 sm:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]
        ${isDark ? "bg-slate-800/50 backdrop-blur-md border border-white/10" : "bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-md border border-purple-100/50"}
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <div className={`text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          Recent Sessions
        </div>
        <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          Activity
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-3 px-3 py-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-sm transition"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${statusColor(s.status)}`}
              >
                <IconPlay className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-900"} truncate`}>
                  {s.title}
                </div>
                <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                  {s.started}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto">
              <div
                className={`text-xs px-3 py-1 rounded-full ${statusColor(s.status)}`}
              >
                {s.status}
              </div>
              <button className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-700 hover:text-slate-900"} whitespace-nowrap`}>
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Replace ONLY the ContainerCard function with this FIXED version:

function ContainerCard({ c, theme }) {
  const isDark = theme === "dark";
  return (
    <div
      className={`
        rounded-2xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.25)]
        ${
          isDark
            ? "bg-slate-800/40 backdrop-blur-md border border-white/10"
            : "bg-gradient-to-b from-purple-100/60 to-indigo-100/60 backdrop-blur-md border border-purple-200/50"
        }
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`p-2 rounded-xl ${
              isDark ? "bg-slate-700/50" : "bg-purple-200/60 backdrop-blur-sm"
            }`}
          >
            <IconContainer className={isDark ? "text-purple-400" : "text-purple-600"} />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`font-semibold text-sm ${isDark ? "text-slate-100" : "text-slate-900"} truncate`}>{c.name}</div>
            <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} bg-slate-200/50 dark:bg-slate-700/50 px-2 py-1 rounded-full truncate`}>{c.id}</div>
          </div>
        </div>

        <div className={`text-xs px-3 py-1 rounded-full ${statusColor(c.status)}`}>
          {c.status}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>CPU</div>
        <div className="w-full bg-slate-100/80 dark:bg-slate-700/40 rounded-full h-1.5 overflow-hidden">
          <div
            style={{ width: `${c.cpu}%` }}
            className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-purple-500"
          />
        </div>

        <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} mt-2`}>Memory</div>
        <div className="w-full bg-slate-100/80 dark:bg-slate-700/40 rounded-full h-1.5 overflow-hidden">
          <div
            style={{ width: `${c.mem}%` }}
            className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500"
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>Logs</div>
          <div className="flex items-center gap-2">
            {/* FIXED: Proper template literal syntax */}
            <button className={`text-xs px-2 py-1 rounded ${isDark ? "bg-slate-700/50 text-slate-200" : "bg-purple-500/20 text-purple-700"}`}>
              Restart
            </button>
            <button className={`text-xs px-2 py-1 rounded ${isDark ? "bg-slate-700/50 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function ActiveContainers({ containers, theme }) {
  const isDark = theme === "dark";
  return (
    <div
      className={`
        rounded-3xl p-3 sm:p-4 sm:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]
        ${
          isDark
            ? "bg-slate-800/50 backdrop-blur-md border border-white/10"
            : "bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-md border border-purple-100/50"
        }
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h3 className={`text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          Active Containers
        </h3>
        <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>Real-time telemetry</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {containers.map((c) => (
          <ContainerCard key={c.id} c={c} theme={theme} />
        ))}
      </div>
    </div>
  );
}

function NotificationsPanel({ notifications, theme }) {
  const isDark = theme === "dark";
  return (
    <div
      className={`
        rounded-3xl p-3 sm:p-4 sm:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]
        ${isDark ? "bg-slate-800/50 backdrop-blur-md border border-white/10" : "bg-gradient-to-br from-purple-50/90 to-indigo-50/90 backdrop-blur-md border border-purple-100/60"}
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <h3 className={`text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          Notifications
        </h3>
        <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          Recent activity
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`
              p-2 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3 transition
              ${isDark ? "hover:bg-slate-700/50 bg-slate-700/30 backdrop-blur-sm border border-white/10" : "hover:bg-purple-100/70 bg-purple-50/80 backdrop-blur-sm border border-purple-200/50"}
            `}
          >
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold self-start sm:self-center
                ${isDark ? "bg-slate-700 text-purple-400" : "bg-purple-200 text-purple-600"}
              `}
            >
              !
            </div>
            <div className={`text-sm ${isDark ? "text-slate-200" : "text-slate-900"} flex-1 min-w-0`}>
              {n.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StartSessionButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold flex items-center gap-3 justify-center sm:justify-start"
    >
      <div className="bg-white/15 p-2 rounded-md flex items-center justify-center">
        <IconPlay className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm">Launch</span>
        <span className="text-xs text-white/80">Start a compute session</span>
      </div>
    </motion.button>
  );
}

// ---------- MAIN DASHBOARD WITH FIXED MAIN CONTENT ----------
export default function ComputeXDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      className={`
        min-h-screen transition-colors duration-300
        ${
          isDark
            ? "bg-[#020921] text-slate-100"
            : "bg-gradient-to-b from-slate-50 to-purple-50 text-slate-900"
        }
      `}
    >
      {/* FIXED LAYOUT CONTAINER */}
      <div className="w-full h-screen flex overflow-hidden">
        
        {/* FIXED SIDEBAR */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          theme={theme}
        />

        {/* FIXED MAIN CONTENT - LIKE SIDEBAR */}
        <div className={`
          fixed top-0 right-0 bottom-0 lg:left-64
          w-full lg:w-auto
          flex flex-col flex-1 z-10
          transition-all duration-300
          ${
            sidebarOpen ? 'ml-0 sm:ml-0' : 'ml-0'
          }
        `}>
          
          {/* Topbar */}
          <Topbar
            onMenuClick={() => setSidebarOpen(true)}
            theme={theme}
            toggleTheme={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          />

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-purple-400/50 scrollbar-track-transparent">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6 max-w-7xl mx-auto w-full px-4">
              
              {/* Left column */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <CreditsCard credits={mock.credits} />

                  <div
                    className={`
                      rounded-3xl p-4 sm:p-5 flex flex-col justify-between h-full
                      shadow-[0_18px_45px_rgba(0,0,0,0.55)]
                      ${
                        isDark
                          ? "bg-slate-800/50 backdrop-blur-md border border-white/10"
                          : "bg-gradient-to-br from-purple-100/70 to-indigo-100/70 backdrop-blur-md border border-purple-200/50"
                      }
                    `}
                  >
                    <div>
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        Quick actions
                      </h3>
                      <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} mt-1`}>
                        Common workflows at your fingertips
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3">
                      <StartSessionButton />
                      <div className="flex flex-wrap gap-2 text-xs">
                        <button
                          className={`
                            flex-1 min-w-[120px] px-4 py-2 rounded-xl
                            ${
                              isDark
                                ? "bg-slate-700/50 text-slate-200 hover:bg-slate-700/70"
                                : "bg-purple-200/80 text-purple-800 hover:bg-purple-300/80"
                            }
                          `}
                        >
                          View Hosts
                        </button>
                        <button
                          className={`
                            flex-1 min-w-[120px] px-4 py-2 rounded-xl
                            ${
                              isDark
                                ? "bg-slate-700/50 text-slate-200 hover:bg-slate-700/70"
                                : "bg-indigo-200/80 text-indigo-800 hover:bg-indigo-300/80"
                            }
                          `}
                        >
                          Billing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <SessionsCard sessions={mock.sessions} theme={theme} />
                <ActiveContainers containers={mock.containers} theme={theme} />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <NotificationsPanel notifications={mock.notifications} theme={theme} />

                <div
                  className={`
                    rounded-3xl p-4 sm:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]
                    ${
                      isDark
                        ? "bg-slate-800/50 backdrop-blur-md border border-white/10"
                        : "bg-gradient-to-br from-purple-50/90 to-indigo-50/90 backdrop-blur-md border border-purple-100/60"
                    }
                  `}
                >
                  <h3 className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Usage Insights
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} mt-2`}>
                    Mini charts and KPI placeholders
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                    <div className={`rounded-xl p-3 ${isDark ? "bg-slate-700/40" : "bg-purple-100/60"}`}>
                      Sparkline / chart placeholder
                    </div>
                    <div className={`rounded-xl p-3 ${isDark ? "bg-slate-700/40" : "bg-indigo-100/60"}`}>
                      Top hosts
                    </div>
                    <div className={`rounded-xl p-3 ${isDark ? "bg-slate-700/40" : "bg-purple-100/60"}`}>
                      Recent logs
                    </div>
                  </div>
                </div>

                <div
                  className={`
                    rounded-3xl p-4 sm:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]
                    ${
                      isDark
                        ? "bg-slate-800/50 backdrop-blur-md border border-white/10"
                        : "bg-gradient-to-br from-purple-50/90 to-indigo-50/90 backdrop-blur-md border border-purple-100/60"
                    }
                  `}
                >
                  <h3 className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Support & Docs
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} mt-2`}>
                    Quick links for onboarding and troubleshooting
                  </p>
                  <ul className={`mt-3 text-sm space-y-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    <li>• Getting started guide</li>
                    <li>• Host agent installation</li>
                    <li>• Troubleshooting connectivity</li>
                  </ul>
                </div>
              </div>
            </div>
          </main>

          {/* Fixed Footer */}
          <footer
            className={`p-3 sm:p-4 text-center text-xs border-t shrink-0
              ${
                isDark
                  ? "text-slate-500 border-white/5 bg-slate-900/30 backdrop-blur-md"
                  : "text-slate-500 border-purple-100 bg-purple-50/80 backdrop-blur-md"
              }
            `}
          >
            ComputeX • Prototype dashboard • © {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
}
