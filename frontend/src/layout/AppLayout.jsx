import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/client.js";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import PageWrapper from "../components/PageWrapper.jsx";
import { motion } from "framer-motion";

export default function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        logout();
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen w-full bg-bg flex overflow-hidden relative">

      {/* Animated Ambient Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-main opacity-20 blur-[140px] pointer-events-none"
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sidebar */}
      <Sidebar user={user} onLogout={logout} />

      {/* Content Column */}
      <main className="flex-1 flex flex-col relative z-10">

        {/* Navbar */}
        <Navbar user={user} />

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-6 relative">

          {/* Outer Panel Shell (neon bordered container) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="
              bg-panel rounded-3xl 
              shadow-[0_0_25px_rgba(0,198,255,0.15)]
              border border-accent2/20 
              h-full p-4 md:p-6 
              overflow-auto transition-colors relative
            "
          >
            {/* Glow Edge Strip */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[4px] bg-accent2/40 opacity-0"
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            />

            {/* Actual Routed Page wrapped in animations */}
            <PageWrapper>
              <Outlet context={{ user }} />
            </PageWrapper>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
