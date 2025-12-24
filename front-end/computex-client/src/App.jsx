import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import DashboardHome from "./pages/DashboardHome";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#071021] dark:via-[#041022] dark:to-[#081226]">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
      </Routes>
    </div>
  );
}

export default App;
