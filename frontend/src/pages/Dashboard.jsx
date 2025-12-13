import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useOutletContext();
  const role = user?.role || localStorage.getItem("role");

  return (
    <div className="space-y-10 relative">

      {/* ✨ Floating ambient particles */}
      {/* <motion.div
        className="absolute -top-2 right-4 text-xl opacity-20 pointer-events-none"
        animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ✨
      </motion.div> */}

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
            Hi {user?.name || "Linguist"}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👋
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-textSecondary text-sm"
          >
            {role === "teacher"
              ? "Manage lessons, quizzes and track student progress."
              : "Keep your streak alive and earn more XP today!"}
          </motion.p>
        </div>

        {/* {role === "teacher" && (
          <motion.span
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-xl bg-accent1 text-bg text-xs shadow-glow uppercase tracking-wide flex items-center gap-1"
          >
            Teacher Mode
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎓
            </motion.span>
          </motion.span>
        )} */}
      </motion.div>

      {/* ============================
          STUDENT DASHBOARD
      ================================= */}
      {role === "student" && (
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <DashCard
            to="/lessons"
            icon="📚"
            title="Continue Lessons"
            desc="Learn new words & phrases with bite-sized lessons."
            glow="accent3"
          />

          <DashCard
            to="/leaderboard"
            icon="🏆"
            title="Leaderboard"
            desc="See how you rank against other learners."
            glow="accent3"
          />

          <DashCard
            to="/profile"
            icon="👤"
            title="Profile"
            desc="View progress, goals & achievements."
            glow="accent3"
          />
        </motion.div>
      )}

      {/* ============================
          TEACHER DASHBOARD
      ================================= */}
      {role === "teacher" && (
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <DashCard
            to="/teacher/add-lesson"
            icon="➕"
            title="Add Lesson"
            desc="Create a new lesson for your students."
            glow="accent3"
          />

          <DashCard
            to="/teacher/add-quiz"
            icon="➕"
            title="Add Quiz"
            desc="Create a new quiz for a lesson."
            glow="accent3"
          />

          <DashCard
            to="/teacher/manage-lessons"
            icon="📘"
            title="Manage Lessons"
            desc="Edit, publish or delete lessons."
            glow="accent3"
          />

          <DashCard
            to="/teacher/manage-quizzes"
            icon="📝"
            title="Manage Quizzes"
            desc="Create or update quizzes for lessons."
            glow="accent3"
          />

          <DashCard
            to="/leaderboard"
            icon="📊"
            title="Students Stats"
            desc="Track students"
            glow="accent3"
          />
        </motion.div>
      )}

      {/* ============================
          ACHIEVEMENTS (Students Only)
      ================================= */}
      {/* {role === "student" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-panel border border-accent1/20 rounded-2xl p-5 shadow-xl text-textSecondary text-sm relative"
        >
          {/* Floating flares */}
          {/* <motion.div
            className="absolute top-3 right-3 text-lg opacity-30"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌟
          </motion.div>

          <h3 className="font-bold text-headerHighlight mb-2 flex items-center gap-1">
            Achievement badges (coming soon)
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎖
            </motion.span>
          </h3>

          <p className="text-xs">
            Earn badges for streaks, XP milestones and completed paths ✨
          </p>
        </motion.div>
      )} */}

    </div>
  );
}

/* ==========================
   Reusable Gamified Dashboard Card
=========================== */
function DashCard({ to, icon, title, desc, glow }) {
  return (
    <Link
      to={to}
      className={`
        group bg-panel border border-b-[3px] border-${glow}/30  
        rounded-2xl p-6 shadow-xl flex flex-col gap-3 
        transition-all hover:border-${glow} hover:shadow-glow hover:-translate-y-2 
        relative overflow-hidden
      `}
    >
      {/* Floating particle */}
      {/* <motion.div
        className="absolute top-2 right-3 text-lg opacity-30 pointer-events-none"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        ✨
      </motion.div> */}

      <motion.span
        className="text-5xl"
        animate={{ rotate: [0, -1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {icon}
      </motion.span>

      <h2 className="text-lg font-bold text-primary">{title}</h2>
      <p className="text-textSecondary text-xs">{desc}</p>

      {/* Bottom shine */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] w-full bg-accent2/30 opacity-0"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </Link>
  );
}
