import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LessonCard({
  lesson,
  onDelete,
  onView,
  onEdit,
  onEditQuiz,
}) {
  const role = localStorage.getItem("role");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="
        relative bg-panel rounded-2xl p-5 shadow-xl border border-b-[3px] border-accent2/20
        flex flex-col justify-between transition-all duration-300
        overflow-hidden group
      "
    >
      {/* Floating Particle Effect */}
      {/* <motion.div
        className="absolute -top-1 -right-1 text-xl opacity-40"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨
      </motion.div> */}

      {/* Moving Accent Line (Gamified highlight) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[3px] bg-accent2 opacity-0 group-hover:opacity-100"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
      ></motion.div>

      {/* TITLE + DESCRIPTION */}
      <div>
        <h2 className="font-bold text-headerHighlight drop-shadow-glow mb-2 text-lg flex items-center gap-1">
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="opacity-80"
            >
            📘
          </motion.span>
            {lesson.title}
        </h2>

        {/* LANGUAGE BADGE WITH FLAG */}
        <div className="flex items-center gap-2 mb-2">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={`https://flagcdn.com/w40/${
              lesson.language === "Spanish"
                ? "es"
                : lesson.language === "French"
                ? "fr"
                : lesson.language === "German"
                ? "de"
                : lesson.language === "Japanese"
                ? "jp"
                : lesson.language === "Korean"
                ? "kr"
                : lesson.language === "Italian"
                ? "it"
                : lesson.language === "Chinese"
                ? "cn"
                : lesson.language === "Hindi"
                ? "in"
                : lesson.language === "Russian"
                ? "ru"
                : lesson.language === "Arabic"
                ? "sa"
                : lesson.language === "Portuguese"
                ? "br"
                : lesson.language === "English"
                ? "us"
                : "un"
            }.png`}
            alt={lesson.language}
            className="w-6 h-4 rounded shadow shadow-glow border border-accent2/40"
          />

          <span className="text-xs font-semibold text-textPrimary tracking-wide uppercase">
            {lesson.language}
          </span>
        </div>

        <p className="text-xs text-textSecondary line-clamp-3 leading-relaxed">
          {lesson.description || "Lesson contains vocabulary and examples."}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-4 flex justify-between items-center text-xs gap-2">
        {/* TEACHER VIEW BUTTON (modal) */}
        {role === "teacher" ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onView}
            className="
              inline-flex items-center gap-1 px-3 py-1.5 rounded-xl 
              bg-bg border border-b-2 border-accent2/30 text-textPrimary 
              hover:bg-accent3 hover:text-textPrimary 
              hover:shadow-glow transition-all
            "
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👁️
            </motion.span>
            View
          </motion.button>
        ) : (
          /* STUDENT VIEW LESSON (page navigation) */
          <Link
            to={`/lessons/${lesson._id}`}
            className="
              inline-flex items-center gap-1 px-3 py-1.5 rounded-xl 
              bg-bg border border-b-2 border-accent2/30 text-textPrimary 
              hover:bg-accent2 hover:text-textPrimary 
              hover:shadow-glow transition-all
            "
          >
            📖 View Lesson
          </Link>
        )}

        {/* STUDENT QUIZ BUTTON */}
        {role === "student" && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/quiz/${lesson._id}`}
              className="
                inline-flex items-center gap-1 px-3 py-1.5 rounded-xl 
                bg-gradient-main text-textPrimary font-semibold shadow-glow 
                hover:scale-105 active:scale-95 transition-all
              "
            >
              🚀 Start Quiz
            </Link>
          </motion.div>
        )}

        {/* TEACHER BUTTONS */}
        {role === "teacher" && (
          <div className="flex gap-2">
            {/* EDIT LESSON */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              whileHover={{ scale: 1.08 }}
              className="
                inline-flex items-center gap-1 px-3 py-1.5 rounded-xl 
                bg-bg border border-b-2 border-accent2/30 text-textPrimary 
                hover:bg-accent3 hover:text-textPrimary 
                hover:shadow-glow transition-all
              "
            >
              ✏️ Edit
            </motion.button>

            {/* EDIT QUIZ */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onEditQuiz();
              }}
              whileHover={{ scale: 1.1 }}
              className="
                inline-flex items-center gap-1 px-3 py-1.5 rounded-xl 
                bg-bg border border-b-2 border-accent2/30 text-textPrimary 
                hover:bg-accent3 hover:text-textPrimary 
                hover:shadow-glow transition-all
              "
            >
              🧩 Quiz
            </motion.button>

            {/* DELETE */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(lesson._id);
              }}
              className="
                px-3 py-1.5 rounded-xl bg-red-500 text-white font-semibold
                hover:bg-red-600 active:scale-95 transition-all
              "
            >
              Delete
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
