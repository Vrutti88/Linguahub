import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Apply theme to document
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative w-14 h-7 rounded-full flex items-center
        transition-all duration-300 border cursor-pointer
        bg-panel border-accent2/40 overflow-hidden
        shadow-[0_0_10px_rgba(0,198,255,0.25)]
      "
    >
      {/* ✨ Sparkle (ambient particle) */}
      {/* <motion.div
        className="absolute top-1 left-1 text-[10px] opacity-40 pointer-events-none"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ✨
      </motion.div> */}

      {/* 🌟 Backlight Aura */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.16 : 0.16 }}
        className={`
          absolute inset-0 blur-xl pointer-events-none
          ${isDark ? "bg-accent1/40" : "bg-accent3/40"}
        `}
      />

      {/* Slider */}
      <motion.div
        initial={false}
        animate={{
          x: isDark ? 4 : 28,
          rotate: isDark ? -8 : 8,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center text-[14px]
          shadow-[0_0_10px_rgba(255,255,255,0.6)] relative z-10
          ${
            isDark
              ? "bg-accent1 text-white shadow-[0_0_12px_rgba(127,91,255,0.9)]"
              : "bg-accent3 text-bg shadow-[0_0_12px_rgba(0,240,168,0.9)]"
          }
        `}
      >
        {isDark ? (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            🌞
          </motion.span>
        )}
      </motion.div>
    </motion.button>
  );
}
