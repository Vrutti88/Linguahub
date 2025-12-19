import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import { motion, AnimatePresence } from "framer-motion";

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [xpPopup, setXpPopup] = useState(null);

  const isYouTube = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Convert YouTube URL -> embed format
  const toYouTubeEmbed = (url) => {
    try {
      if (url.includes("youtu.be")) {
        const id = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${id}`;
      }
      const params = new URL(url).searchParams;
      const id = params.get("v");
      return `https://www.youtube.com/embed/${id}`;
    } catch {
      return url;
    }
  };

  // Load Lesson + Progress
  const loadLesson = async () => {
    try {
      const res = await api.get(`/lesson/${id}`);
      setLesson(res.data);

      try {
        const progressRes = await api.get(`/progress/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCompleted(progressRes.data.completed || false);
      } catch { }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLesson();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-14 h-14 border-4 border-accent2 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  // Empty lesson
  if (!lesson || !lesson.contents?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-textSecondary">
        <p>No content in this lesson yet.</p>
        <button
          onClick={() => navigate("/lessons")}
          className="mt-3 px-4 py-2 rounded-xl bg-gradient-main text-textPrimary text-sm shadow-glow"
        >
          ← Back to Lessons
        </button>
      </div>
    );
  }

  // Lesson logic
  const items = lesson.contents;
  const total = items.length;
  const current = items[index];
  const isLast = index === total - 1;

  const progress = ((index + 1) / total) * 100;

  const next = () => {
    if (!isLast) setIndex((i) => i + 1);
  };

  const markCompleted = async () => {
    try {
      await api.put(
        "/user/progress",
        { lessonId: lesson._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setCompleted(true);
      // 🎉 XP Gained Animation
      setXpPopup(+20); // animation shows +20 XP
      setTimeout(() => setXpPopup(null), 3000); // remove after 2s

      alert("🎉 Lesson Completed! Quiz unlocked.");


    } catch (err) {
      console.error(err);
      alert("Failed to save lesson progress.");
    }
  };

  const goToQuiz = () => navigate(`/quiz/${lesson._id}`);

  return (
    <div className="min-h-screen flex justify-center px-4 py-8 relative">

<AnimatePresence>
  {xpPopup && (
    <motion.div
      key="xp-popup"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: -40, scale: 1 }}
      exit={{ opacity: 0, y: -80, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999]
                 px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-lg shadow-2xl"
    >
      +{xpPopup} XP
    </motion.div>
  )}
</AnimatePresence>
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-3xl bg-panel rounded-3xl border border-accent2/40 
          shadow-2xl p-6 relative overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-1"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                >
                📘
              </motion.span>
                {lesson.title}
            </motion.h1>

            <p className="text-[11px] text-textSecondary">
              Item {index + 1} / {total}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 bg-bg border border-accent2/40 rounded-xl 
                       text-xs text-textSecondary hover:border-accent2 hover:text-textPrimary transition"
          >
            ← Exit
          </motion.button>
        </div>

        {/* PROGRESS */}
        <div className="mb-6">
          <div className="w-full h-2 bg-bg rounded-full overflow-hidden border border-accent2/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-main"
            />
          </div>
          <motion.p
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="mt-1 text-[11px] text-textSecondary"
          >
            Keep going! 🌟
          </motion.p>
        </div>

        {/* MAIN CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="bg-bg rounded-2xl border border-accent2/40 shadow-xl p-6 mb-6 relative z-10"
          >
            {/* Source */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-lg font-extrabold text-textPrimary mb-2 flex items-center gap-2"
            >
              {current.src}
            </motion.p>

            {/* Translation (always visible) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              <p className="text-xs text-accent2 bg-accent2/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-sm">
                <span className="text-accent3 font-bold">Translation:</span>
                <span className="text-textPrimary">{current.target}</span>
              </p>
            </motion.p>

            {/* Pronunciation */}
            {current.pronunciation && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
              >
                <p className="text-xs text-accent3 bg-accent2/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 shadow-sm">
                  <span className="font-semibold">Pronunciation:</span>
                  <span className="text-textPrimary">{current.pronunciation}</span>
                </p>
              </motion.div>
            )}

            {/* Image */}
            {current.imageUrl && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                src={current.imageUrl}
                className="w-40 rounded-2xl border border-accent2/40 shadow-md mt-5"
                alt=""
              />
            )}

            {/* Audio */}
            {current.audioUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-4"
              >
                <audio controls className="w-full rounded-lg shadow-inner">
                  <source src={current.audioUrl} />
                </audio>
              </motion.div>
            )}

            {/* Video */}
            {current.videoUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                {isYouTube(current.videoUrl) ? (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-accent1 mb-1">Video:</p>
                    <iframe
                      className="w-full aspect-video rounded-xl border border-accent2/30 shadow-lg"
                      src={toYouTubeEmbed(current.videoUrl)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    <video
                      controls
                      className="w-full rounded-xl border border-accent2/30 shadow-lg"
                    >
                      <source src={current.videoUrl} />
                    </video>
                  </div>
                )}
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          {!isLast ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="flex-1 py-3 rounded-2xl bg-gradient-main text-textPrimary 
                         font-semibold shadow-glow text-sm transition"
            >
              Next →
            </motion.button>
          ) : (
            <>
              {!completed && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markCompleted}
                  className="flex-1 py-3 rounded-2xl bg-gradient-main text-textPrimary 
                          font-semibold shadow-glow text-sm transition"
                >
                  ✅ Complete Lesson
                </motion.button>
              )}

              {completed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={goToQuiz}
                  className="flex-1 py-3 rounded-2xl bg-gradient-main text-textPrimary 
                           font-semibold shadow-glow text-sm transition"
                >
                  🎯 Start Quiz
                </motion.button>
              )}
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/lessons")}
            className="flex-1 py-3 rounded-2xl bg-bg border border-accent2/40 
                       text-sm text-textSecondary hover:border-accent2 hover:text-textPrimary transition"
          >
            Back to lessons
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
