import { motion } from "framer-motion";

export default function LeaderboardCard({ rank, name, xp, streak }) {
  const emoji =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "✨";

  const role = localStorage.getItem("role");

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring" }}
      className={`
        relative flex items-center justify-between bg-panel rounded-2xl 
        px-5 py-4 border border-b-[2.5px] border-accent2/40 
        shadow-[0_0_12px_rgba(30,144,255,0.25)]
        overflow-hidden
      `}
    >

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <motion.span
          className="text-3xl drop-shadow-glow"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {emoji}
        </motion.span>

        <div className="leading-tight">
          <p className="font-bold text-textPrimary text-sm tracking-wide">
            {name}
          </p>

          <p className="text-xs text-textSecondary flex items-center gap-1">
            {streak} day streak
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            >
              🔥
            </motion.span>
          </p>
        </div>
      </div>

      {/* XP BADGE */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-end"
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="
            text-xs font-bold text-textPrimary
            bg-gradient-main px-3 py-1 
            rounded-xl shadow-glow
            tracking-wide
          "
        >
          {xp} XP
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
