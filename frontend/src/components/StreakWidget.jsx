import { motion } from "framer-motion";

export default function StreakWidget({ streak = 0 }) {
  const isActive = streak > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        relative inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm
        border transition-all duration-300 select-none
        ${
          isActive
            ? "bg-gradient-main text-textPrimary border-accent3 shadow-glow animate-[pulse_1.8s_ease-in-out_infinite]"
            : "bg-panel border-accent2/20 text-textSecondary"
        }
      `}
    >
      {/* 🔥 Floating Ember Particles (active only) */}
      {isActive && (
        <>
          <motion.div
            className="absolute -top-1 left-1 text-[10px] opacity-50 pointer-events-none"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-1 text-[11px] opacity-40 pointer-events-none"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.1 }}
          >
            🔥
          </motion.div>
        </>
      )}

      {/* 🔥 Flame / 🕊️ Icon */}
      <motion.span
        animate={
          isActive
            ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }
            : {}
        }
        transition={{
          duration: 1.8,
          repeat: isActive ? Infinity : 0,
        }}
        className={`
          text-lg md:text-xl transition-all 
          ${isActive ? "drop-shadow-[0_0_10px_rgba(255,150,0,0.9)]" : ""}
        `}
      >
        {isActive ? "🔥" : "🕊️"}
      </motion.span>

      {/* TEXT */}
      <motion.span
        animate={
          isActive
            ? { opacity: [1, 0.7, 1] }
            : {}
        }
        transition={{
          duration: 1.8,
          repeat: isActive ? Infinity : 0,
        }}
        className="font-semibold"
      >
        {isActive ? `${streak} day streak` : "Start your streak!"}
      </motion.span>
    </motion.div>
  );
}
