import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import { motion } from "framer-motion";

export default function LessonOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // LOAD LESSON + PROGRESS STATUS
  const loadLesson = async () => {
    try {
      const res = await api.get(`/lesson/${id}`);
      setLesson(res.data);

      const progress = await api.get(`/progress/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setIsCompleted(progress.data.completed || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLesson();
  }, [id]);

  const startLesson = () => navigate(`/lessons/${id}/start`);
  const goToQuiz = () => navigate(`/quiz/${id}`);
  const goBack = () => navigate("/lessons");

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-textSecondary">
        <motion.div
          className="w-14 h-14 border-4 border-accent2 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-textSecondary">
        <p>Lesson not found.</p>

        <motion.button
          onClick={goBack}
          whileHover={{ scale: 1.05 }}
          className="mt-3 px-4 py-2 bg-gradient-main rounded-xl text-textPrimary text-sm shadow-glow"
        >
          ← Back to Lessons
        </motion.button>
      </div>
    );
  }

  const totalItems = lesson.contents?.length || 0;

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center relative">

      {/* MAIN PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-3xl bg-panel border border-accent2/30 rounded-3xl shadow-2xl p-6 
          relative overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="flex justify-between items-start mb-5 relative z-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow mb-1 flex items-center gap-1"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                >
                📘
              </motion.span>
                {lesson.title}
            </motion.h1>

            <p className="text-xs text-accent1 capitalize">
              Level: {lesson.level}
            </p>
          </div>

          <motion.button
            onClick={goBack}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-bg border border-accent2/40 rounded-xl text-xs text-textSecondary hover:text-textPrimary hover:border-accent2 transition"
          >
            ← Back
          </motion.button>
        </div>

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-bg rounded-2xl border border-accent2/30 p-4 mb-6"
        >
          <p className="text-xs text-textSecondary mb-1">About this lesson</p>
          <p className="text-sm text-textPrimary leading-relaxed">
            {lesson.description}
          </p>
        </motion.div>

        {/* INFO GRID */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-3 gap-4 text-xs mb-6"
        >
          <InfoCard label="⏱ Estimated" value={lesson.estimatedTime || "5 min"} />
          <InfoCard label="📚 Items" value={totalItems} />
          <InfoCard label="⭐ XP Reward" value="+20 XP" />
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 mt-4"
        >
          {/* Start Lesson */}
          <motion.button
            onClick={startLesson}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="
              flex-1 py-3 rounded-2xl bg-gradient-main text-textPrimary 
              font-semibold shadow-glow text-sm transition
            "
          >
            ▶ Start Lesson
          </motion.button>

          {/* QUIZ Button */}
          {isCompleted ? (
            <motion.button
              onClick={goToQuiz}
              whileHover={{ scale: 1.03 }}
              className="
                flex-1 py-3 rounded-2xl bg-gradient-main text-textPrimary 
                font-semibold shadow-glow text-sm transition flex items-center justify-center gap-2
              "
            >
              🎯 Start Quiz
            </motion.button>
          ) : (
            <motion.button
              disabled
              animate={{ opacity: [1, 0.75, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="
                flex-1 py-3 rounded-2xl bg-panel border border-accent2/30 
                text-xs text-textSecondary cursor-not-allowed flex items-center justify-center gap-2
              "
            >
              🔒 Quiz Locked — Complete Lesson First
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* SMALL INFO CARD */
function InfoCard({ label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-bg rounded-2xl p-3 border border-accent2/30 shadow-inner"
    >
      <p className="text-textSecondary">{label}</p>
      <p className="font-semibold text-textPrimary mt-1">{value}</p>
    </motion.div>
  );
}
