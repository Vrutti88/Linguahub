import { motion } from "framer-motion";

export default function StreakWidget({ streak = 0 }) {
  const isActive = streak > 0;

  function AnimatedFlame() {
    return (
      <motion.span
        style={{ display: "inline-block", transformOrigin: "center center" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        🔥
      </motion.span>
    );
  }
  

  const icon = streak >= 1 ? <AnimatedFlame /> : "🕊️";

  let text = "Start your streak!";
  if (streak === 1) text = "1";
  else if (streak >= 2) text = `${streak}`;

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl 
        text-xs md:text-sm border border-b-[3px] select-none
        ${isActive
          ? "bg-bg text-textPrimary border-accent3/30 shadow-glow"
          : "bg-panel border-accent2/20 text-textSecondary"
        }
      `}
    >
      <span
        className={`
          inline-block
          ${isActive ? "drop-shadow-[0_0_10px_rgba(255,160,0,0.9)]" : ""}
        `}
      >
        {icon}
      </span>

      <span className="font-semibold whitespace-nowrap">{text}</span>
    </div>
  );
}
