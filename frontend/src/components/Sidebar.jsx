import { NavLink,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Dashboard from "../pages/Dashboard";


export default function Sidebar({ user, onLogout }) {
  const role = user?.role || localStorage.getItem("role");

  const navigate = useNavigate();

  const base =
    "px-3 py-2 rounded-xl flex items-center gap-3 text-sm transition-all duration-300";

  const activeClass =
    "bg-gradient-main text-textPrimary shadow-glow scale-[1.03] border border-accent2/40";

  const inactiveClass =
    "text-textSecondary hover:text-textPrimary hover:bg-panel/40 hover:shadow-glow hover:border-accent2/30 border border-transparent";

  return (
    <aside
      className="
        hidden md:flex w-64 bg-panel/60 backdrop-blur-xl 
        border-r border-accent2/20 
        shadow-[4px_0_20px_rgba(0,198,255,0.1)]
        text-textPrimary flex-col p-5 gap-6
        relative overflow-hidden
      "
    >
      {/* Floating Particles */}
      {/* <motion.div
        className="absolute top-5 left-3 text-lg opacity-25 pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨
      </motion.div> */}

      {/* <motion.div
        className="absolute bottom-6 right-4 text-xl opacity-20 pointer-events-none"
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.7 }}
      >
        🌟
      </motion.div> */}

      {/* Brand / Logo */}
      <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={() => navigate("/")}>
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="
            w-11 h-11 rounded-2xl bg-gradient-main 
            flex items-center justify-center text-xl 
            font-extrabold text-textPrimary shadow-glow
          "
        >
          L
        </motion.div>

        <div>
          <h1 className="font-extrabold text-xl tracking-wide text-headerHighlight drop-shadow-glow flex items-center gap-1">
            Linguahub
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="inline-block"
            >
              📚
            </motion.span>
          </h1>
          <p className="text-[11px] text-textSecondary">Gamified learning</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-2">
        {/* ===================== STUDENT MENU ===================== */}
        {role === "student" && (
          <>
            <AnimatedNav to="/" icon="🏠" label="Dashboard" base={base} active={activeClass} inactive={inactiveClass} end />
            <AnimatedNav to="/lessons" icon="📚" label="Lessons" base={base} active={activeClass} inactive={inactiveClass} />
            <AnimatedNav to="/leaderboard" icon="🏆" label="Leaderboard" base={base} active={activeClass} inactive={inactiveClass} />
          </>
        )}

        {/* ===================== TEACHER MENU ===================== */}
        {role === "teacher" && (
          <>
            <AnimatedNav to="/teacher" icon="🎓" label="Teacher Dashboard" base={base} active={activeClass} inactive={inactiveClass} end />
            <AnimatedNav to="/teacher/add-lesson" icon="➕" label="Add Lesson" base={base} active={activeClass} inactive={inactiveClass} />
            <AnimatedNav to="/teacher/add-quiz" icon="➕" label="Add Quiz" base={base} active={activeClass} inactive={inactiveClass} />
            <AnimatedNav to="/teacher/manage-lessons" icon="📝" label="Manage Lessons" base={base} active={activeClass} inactive={inactiveClass} />
            <AnimatedNav to="/teacher/manage-quizzes" icon="❓" label="Manage Quizzes" base={base} active={activeClass} inactive={inactiveClass} />
            <AnimatedNav to="/leaderboard" icon="📊" label="Student Stats" base={base} active={activeClass} inactive={inactiveClass} />
          </>
        )}

        {/* ===================== FOOTER ===================== */}
        <div className="mt-auto flex flex-col gap-2">
          <AnimatedNav to="/profile" icon="👤" label="Profile" base={base} active={activeClass} inactive={inactiveClass} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={onLogout}
            className="
              mt-2 w-full bg-red-500 hover:bg-red-600 
              text-white font-semibold py-2 rounded-xl 
              shadow-[0_0_12px_rgba(255,0,0,0.4)] text-sm 
              transition-all
            "
          >
            Log out
          </motion.button>
        </div>
      </nav>
    </aside>
  );
}

/* ================================
   Gamified Animated NavLink Item
================================ */
function AnimatedNav({ to, icon, label, base, active, inactive, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
    >
      <motion.span
        animate={isActive => isActive ? { scale: [1, 1.2, 1] } : {}}
        className="text-lg"
      >
        {icon}
      </motion.span>
      <span>{label}</span>
    </NavLink>
  );
}
