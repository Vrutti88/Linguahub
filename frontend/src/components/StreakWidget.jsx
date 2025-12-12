export default function StreakWidget({ streak = 0 }) {
  const isActive = streak > 0;

  const icon = streak >= 1 ? "🔥" : "🕊️";

  let text = "Start your streak!";
  if (streak === 1) text = "1";
  else if (streak >= 2) text = `${streak}`;

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-2xl 
        text-xs md:text-sm border select-none
        ${
          isActive
            ? "bg-gradient-main text-textPrimary border-accent3 shadow-glow"
            : "bg-panel border-accent2/20 text-textSecondary"
        }
      `}
    >
      <span
        className={`
          text-lg md:text-xl
          ${isActive ? "drop-shadow-[0_0_10px_rgba(255,160,0,0.9)]" : ""}
        `}
      >
        {icon}
      </span>

      <span className="font-semibold whitespace-nowrap">{text}</span>
    </div>
  );
}
