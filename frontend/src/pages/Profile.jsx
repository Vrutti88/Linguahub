import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/client.js";
import StreakWidget from "../components/StreakWidget.jsx";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useOutletContext();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await api.get("/user/streak");
        setStreak(res.data.streak || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStreak();
  }, []);

  return (
    <div className="space-y-8 relative">
      
      {/* ✨ Floating Glow */}
      {/* <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-main blur-3xl opacity-20 pointer-events-none"
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      /> */}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 2 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
          👤 Profile
        </h1>
        <p className="text-xs text-textSecondary">
          Your progress and learning stats.
        </p>
      </motion.div>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        // whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 bg-panel border border-accent2/30 
                   rounded-2xl p-5 shadow-xl hover:shadow-glow"
      >
        {/* Animated Avatar Bubble */}
        <motion.div
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-14 h-14 rounded-2xl bg-gradient-main 
                     flex items-center justify-center text-3xl shadow-glow"
        >
          🌐
        </motion.div>

        <div>
          <p className="font-bold text-textPrimary text-sm">
            {user?.name || "Learner"}
          </p>
          <p className="text-xs text-textSecondary">{user?.email}</p>
          <p className="text-xs text-textSecondary capitalize">
            Role: {user?.role || "student"}
          </p>
        </div>
      </motion.div>

      {/* Streak Widget */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <StreakWidget streak={streak} />
      </motion.div>

      {/* Achievement Card */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        // whileHover={{ scale: 1.02 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-panel border border-accent1/20 rounded-2xl p-5 shadow-xl text-xs hover:shadow-glow"
      >
        <p className="font-bold text-headerHighlight mb-2 drop-shadow-glow flex items-center gap-1">
          🏆 Achievement Badges
        </p>

        <ul className="list-disc list-inside space-y-1 text-textSecondary">
          <motion.li
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥 7-day streak badge
          </motion.li>

          <motion.li
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            ⭐ 1000 XP milestone badge
          </motion.li>

          <motion.li
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            🌍 First language completed badge
          </motion.li>
        </ul>
      </motion.div> */}
    </div>
  );
}
