// src/pages/Lessons.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { motion } from "framer-motion";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadLessons = async () => {
    try {
      const res = await api.get("/lessons");
      setLessons(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const goToLessonOverview = (id) => {
    navigate(`/lessons/${id}/overview`);
  };

  return (
    <div className="min-h-screen px-4 py-6 text-textPrimary relative">

      {/* ✨ Ambient floating particles */}
      <motion.div
        className="absolute top-6 right-10 text-2xl opacity-20 pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        ✨
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
            📚 Your Lessons
            {/* <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              ⭐
            </motion.span> */}
          </h1>

          <p className="text-textSecondary text-sm">
            Continue your language journey one lesson at a time.
          </p>
        </div>
      </div>

      {/* ===================================
          LOADING STATE
      ====================================== */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <motion.div
            className="w-14 h-14 rounded-full border-4 border-accent2 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
      ) : lessons.length === 0 ? (
        <p className="text-textSecondary text-center mt-20 text-sm">
          No lessons available yet. Check back soon! ✨
        </p>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {lessons.map((lesson, index) => (
            <motion.button
              key={lesson._id}
              onClick={() => goToLessonOverview(lesson._id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="
                relative text-left bg-panel border border-accent2/30 rounded-2xl p-5
                shadow-xl hover:shadow-glow transition-all duration-300
                overflow-hidden group
              "
            >
              {/* Floating sparkle */}
              {/* <motion.div
                className="absolute top-2 right-3 text-sm opacity-30 pointer-events-none"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ✨
              </motion.div> */}

              {/* Animated XP/Time pill */}
              <motion.div
                className="
                  absolute top-3 right-3 text-[10px] px-2 py-1 
                  rounded-full bg-gradient-main text-textPrimary shadow-glow
                "
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ⭐ {lesson.estimatedTime || "5 min"}
              </motion.div>

              {/* Title */}
              <h2 className="text-xl font-bold text-headerHighlight mb-1 flex items-center gap-1">
                <motion.span
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  >
                  📘
                </motion.span>
                  {lesson.title}
              </h2>

              {/* Level */}
              <p className="text-xs text-accent3 capitalize mb-2 flex items-center gap-1">
                {lesson.level || "beginner"}
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                >
                  🎯
                </motion.span>
              </p>

              {/* Description */}
              <p className="text-xs text-textSecondary line-clamp-3 mb-4">
                {lesson.description}
              </p>

              {/* Fake progress bar */}
              <div>
                <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-accent2/20">
                  <motion.div
                    className="h-full bg-gradient-main rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "34%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                <p className="mt-1 text-[11px] text-textSecondary">
                  Progress:{" "}
                  <span className="text-textSecondary font-semibold">34%</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="inline-block ml-1"
                  >
                    🚀
                  </motion.span>
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
