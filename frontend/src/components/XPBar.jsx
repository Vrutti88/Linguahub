import { motion } from "framer-motion";

export default function XPBar({ xp = 0, goal = 100 }) {
  const percent = Math.min(100, Math.round((xp / goal) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        relative w-full p-3 rounded-2xl 
        bg-panel border border-accent2/20 
        shadow-[0_0_12px_rgba(0,198,255,0.15)]
        overflow-hidden
      "
    >
      {/* ✨ Floating Particle */}
      {/* <motion.div
        className="absolute top-2 right-3 text-[10px] opacity-50 pointer-events-none"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        ✨
      </motion.div> */}

      {/* ✨ Background Glow Aura */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        className="absolute inset-0 bg-accent2/30 blur-2xl pointer-events-none"
      />

      {/* Top Labels */}
      <div className="flex justify-between text-[11px] mb-2 relative z-10">
        <span className="font-semibold text-headerHighlight drop-shadow-glow">
          XP Progress
        </span>
        <span className="text-textSecondary">
          {xp} / {goal} XP
        </span>
      </div>

      {/* XP Bar Track */}
      <div className="w-full h-2 bg-bg rounded-xl overflow-hidden border border-accent2/30 relative z-10">
        {/* XP Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            h-full rounded-xl bg-gradient-main shadow-main relative overflow-hidden
          "
        >
          {/* ⭐ Shine Sweep */}
          <motion.div
            className="absolute top-0 left-0 h-full w-10 bg-white/30 blur-md"
            animate={{ x: ["-20%", "120%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />

          {/* 🌟 XP Pulse Glow (based on percent) */}
          <motion.div
            className="absolute inset-0 bg-accent2/40 blur-md"
            animate={{
              opacity: percent > 0 ? [0.2, 0.45, 0.2] : 0,
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {/* 📈 Percent text on top (optional aesthetic) */}
      {/* <motion.span
        animate={{
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="absolute bottom-1 right-3 text-[10px] text-accent2 font-semibold pointer-events-none"
      >
        {percent}%
      </motion.span> */}
    </motion.div>
  );
}
