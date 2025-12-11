import XPBar from "./XPBar.jsx";
import StreakWidget from "./StreakWidget.jsx";
import { useEffect, useState } from "react";
import api from "../api/client.js";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";

export default function Navbar({ user }) {
  const [streak, setStreak] = useState(0);
  const role = user?.role || localStorage.getItem("role");

  useEffect(() => {
    if (role === "student") {
      const fetchStreak = async () => {
        try {
          const res = await api.get("/user/streak");
          setStreak(res.data.streak || 0);
        } catch (err) {
          console.error(err);
        }
      };
      fetchStreak();
    }
  }, [role]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        w-full px-4 md:px-6 py-3 flex items-center justify-between
        bg-panel/70 backdrop-blur-xl border-b border-accent2/20
        shadow-[0_4px_18px_rgba(0,198,255,0.2)] sticky top-0 z-20
        relative overflow-hidden
      "
    >
      {/* Floating Particles */}
      {/* <motion.div
        className="absolute top-0 left-3 text-xl opacity-30 pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-4 text-lg opacity-20 pointer-events-none"
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        🌟
      </motion.div> */}

      {/* MOBILE BRAND */}
      <div className="md:hidden flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="
            w-9 h-9 rounded-2xl bg-gradient-main shadow-glow 
            flex items-center justify-center text-lg font-extrabold text-textPrimary
          "
        >
          L
        </motion.div>

        <div>
          <h1 className="font-extrabold text-lg text-headerHighlight drop-shadow-glow flex items-center gap-1">
            Linguahub
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              🔥
            </motion.span>
          </h1>
          <p className="text-[10px] text-textSecondary">Learn daily, playfully</p>
        </div>
      </div>

      {/* XP BAR — STUDENT ONLY */}
      {role === "student" && (
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <XPBar xp={42} goal={100} />
          </motion.div>
        </div>
      )}

      {/* TEACHER spacer (keeps layout aligned) */}
      {role === "teacher" && <div className="flex-1 max-w-md mx-4 hidden md:block"></div>}

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Streak Widget — Students Only */}
        {role === "student" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <StreakWidget streak={streak} />
          </motion.div>
        )}

        {/* THEME TOGGLE */}
        <motion.div whileHover={{ scale: 1.07 }}>
          <ThemeToggle />
        </motion.div>

        {/* USER INFO */}
        <motion.div
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex flex-col items-end text-xs"
        >
          <span className="font-semibold text-headerHighlight drop-shadow-glow flex items-center gap-1">
            {user?.name || "Learner"}
            {/* <motion.span
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="opacity-80"
            >
              🎧
            </motion.span> */}
          </span>
          <span className="text-textSecondary capitalize">{role}</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
