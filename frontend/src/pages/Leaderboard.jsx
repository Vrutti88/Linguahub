import LeaderboardCard from "../components/LeaderboardCard.jsx";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/client.js";

export default function Leaderboard() {
  const { user } = useOutletContext();
  const role = user?.role || localStorage.getItem("role");

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Later replaced with BACKEND leaderboard API
    const fetchData = async () => {
      try {
        // TEMPORARY MOCK DATA (replace with backend)
        const mockStudents = [
          { name: "Aarav", xp: 450, streak: 7, quizzes: 12, accuracy: 87 },
          { name: "Meera", xp: 380, streak: 5, quizzes: 10, accuracy: 80 },
          { name: "Riya", xp: 290, streak: 3, quizzes: 7, accuracy: 70 },
          { name: "Kabir", xp: 260, streak: 2, quizzes: 6, accuracy: 65 },
          { name: "Shaan", xp: 200, streak: 1, quizzes: 4, accuracy: 60 },
          { name: "You", xp: 320, streak: 4, quizzes: 9, accuracy: 75 },
        ];

        setStudents(mockStudents.sort((a, b) => b.xp - a.xp));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================
  // STUDENT VIEW
  // ==========================
  const StudentLeaderboard = () => (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
            🏆 Weekly Leaderboard
          </h1>
          <p className="text-xs text-textSecondary mt-1">
            Earn XP from quizzes to climb the rankings.
          </p>
        </div>
      </motion.div>

      {/* LEADERBOARD */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        {students.map((u, index) => (
          <LeaderboardCard
            key={u.name}
            rank={index + 1}
            name={u.name}
            xp={u.xp}
            streak={u.streak}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-[11px] text-textSecondary"
      >
        Real leaderboard integration coming soon.
      </motion.p>
    </div>
  );

  // ==========================
// TEACHER VIEW — STUDENT STATS (GAMIFIED UI)
// ==========================
const TeacherStats = () => (
  <div className="space-y-6">
    {/* HEADER */}
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
          📊 Student Statistics
        </h1>
        <p className="text-xs text-textSecondary mt-1">
          Track progress, performance, streaks, and quiz activity.
        </p>
      </div>
    </motion.div>

    {/* STUDENTS LIST */}
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {students.map((s, index) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="
            relative bg-panel border border-accent2/30 rounded-xl p-4 shadow-xl
            overflow-hidden group
          "
        >
          {/* Floating Glow Particle */}
          {/* <motion.div
            className="absolute -top-1 -right-1 text-lg opacity-30"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            ✨
          </motion.div> */}

          {/* Rank Badge Glow */}
          {/* <motion.div
            className="absolute -left-2 top-1 text-xl opacity-20"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌟
          </motion.div> */}

          <div className="flex justify-between items-center">
            {/* LEFT SIDE */}
            <div>
              <p className="font-bold text-headerHighlight drop-shadow-glow text-sm flex items-center gap-1">
                #{index + 1} — {s.name}
                <motion.span
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="opacity-70"
                >
                  🎯
                </motion.span>
              </p>

              <p className="text-[11px] text-textSecondary flex items-center gap-1">
                XP:
                <span className="text-accent3 font-semibold">{s.xp}</span>
                • Streak: {s.streak}
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="inline-block"
                >
                  🔥
                </motion.span>
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="text-right text-xs text-textSecondary leading-tight">
              <p className="flex items-center gap-1">
                Quizzes:
                <span className="text-textPrimary font-semibold">
                  {s.quizzes}
                </span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                >
                  📘
                </motion.span>
              </p>

              <p className="flex items-center gap-1">
                Accuracy:
                <span className="text-textPrimary font-semibold">
                  {s.accuracy}%
                </span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🎯
                </motion.span>
              </p>
            </div>
          </div>

          {/* Progress Bar for XP (Gamification!) */}
          <motion.div
            className="mt-3 h-2 bg-bg/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-main shadow-glow"
              initial={{ width: "0%" }}
              animate={{
                width: `${Math.min((s.accuracy || 0), 100)}%`,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </motion.div>

          <p className="text-[9px] mt-1 text-textSecondary opacity-70">
            Performance bar (based on accuracy)
          </p>
        </motion.div>
      ))}
    </motion.div>

    {/* FOOTNOTE */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ delay: 0.4 }}
      className="mt-4 text-[11px] text-textSecondary"
    >
      Real API stats will be added once backend leaderboard is ready.
    </motion.p>
  </div>
);


  // ===========================
  // PAGE SWITCH BASED ON ROLE
  // ===========================
  if (loading)
    return <p className="text-textSecondary text-sm">Loading leaderboard...</p>;

  return role === "teacher" ? <TeacherStats /> : <StudentLeaderboard />;
}
