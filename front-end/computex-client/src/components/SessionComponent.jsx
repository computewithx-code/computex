// SessionComponent.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SessionComponent({ setSessions, fetchContainers }) {
  const [loading, setLoading] = useState(false);

  const startSession = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/sessions/start");
      const newSession = res.data.session;

      // Add new session to dashboard state
      setSessions((prev) => [newSession, ...prev]);

      // 🔥 Refresh containers immediately
      if (fetchContainers) fetchContainers();

      alert("Session started successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <motion.button
        onClick={startSession}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold flex items-center gap-3"
      >
        {loading ? "Starting..." : "Start Compute Session"}
      </motion.button>
    </div>
  );
}
