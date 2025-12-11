// src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Quiz() {
  const params = useParams();
  const lessonId = params.lessonId || params.id || params.quizId;
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // -------------------------------------------------
  // Load lesson + quiz
  // -------------------------------------------------
  const fetchQuiz = async () => {
    try {
      const lessonRes = await api.get(`/lesson/${lessonId}`);
      setLesson(lessonRes.data);

      try {
        const quizRes = await api.get(`/quiz/${lessonId}`);
        setQuiz(quizRes.data);
        setAnswers(new Array(quizRes.data.questions.length).fill(null));
      } catch (err) {
        if (err.response?.status === 404) setQuiz(null);
        else console.error(err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [lessonId]);

  // -------------------------------------------------
  // Loading
  // -------------------------------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-textSecondary">
        <motion.div
          className="w-10 h-10 border-4 border-accent2 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      </div>
    );
  }

  // -------------------------------------------------
  // No Quiz Found
  // -------------------------------------------------
  if (!quiz?.questions?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-2xl font-bold text-headerHighlight drop-shadow-glow">
          ❌ No Quiz Available
        </h1>
        <p className="text-sm text-textSecondary">
          This lesson doesn’t have a quiz yet.
        </p>
        <button
          onClick={() => navigate(`/lessons/${lessonId}/overview`)}
          className="px-4 py-2 rounded-xl bg-accent2 text-bg text-xs shadow-glow hover:scale-105 transition"
        >
          ← Back to Lesson
        </button>
      </motion.div>
    );
  }

  // -------------------------------------------------
  // Quiz Logic
  // -------------------------------------------------
  const total = quiz.questions.length;
  const current = quiz.questions[currentIdx];

  const normalizedQuestion = {
    type: current.type || (current.answerText ? "fib" : "mcq"),
    question: current.question || "",
    options: current.options?.length ? current.options : ["", "", "", ""],
    answerText: current.answerText || "",
  };

  const progress = Math.round(((currentIdx + 1) / total) * 100);

  const setAnswer = (val) => {
    const copy = [...answers];
    copy[currentIdx] = val;
    setAnswers(copy);
  };

  const prevQuestion = () =>
    currentIdx > 0 && setCurrentIdx((i) => i - 1);

  const nextQuestion = () =>
    currentIdx < total - 1 && setCurrentIdx((i) => i + 1);

  // -------------------------------------------------
  // Submit Quiz
  // -------------------------------------------------
  const handleSubmit = async () => {
    if (answers.some((a) => a === null || a === "")) {
      if (!window.confirm("Some questions are unanswered. Submit anyway?"))
        return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/quiz/submit", { lessonId, answers });
      setResult(res.data);

      await api.post("/progress/complete", { lessonId });

      confetti({
        zIndex: 9999,
        particleCount: 150,
        spread: 120,
        startVelocity: 40,
        origin: { y: 0.6 },
      });

    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------------------------
  // RESULT SCREEN
  // -------------------------------------------------
  if (result) {
    const percent = Math.round((result.score / result.total) * 100);
    const success = percent >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-center text-textPrimary"
      >
        <div className="bg-panel p-6 rounded-2xl border border-accent2/30 shadow-xl space-y-3">
          <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow">
            {success ? "🎉 Amazing!" : "Keep Practicing 💪"}
          </h1>

          <p className="text-sm text-textSecondary">
            You scored{" "}
            <span className="text-accent3 font-bold">
              {result.score}/{result.total}
            </span>{" "}
            ({percent}%)
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-sm mx-auto mt-4">
            <div className="w-full h-2 rounded-full bg-bg border border-gradient-main overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8 }}
                className={`h-full rounded-full ${
                  success ? "bg-accent2" : "bg-accent3"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setResult(null);
              setCurrentIdx(0);
              setAnswers(new Array(total).fill(null));
            }}
            className="flex-1 px-4 py-2 rounded-xl bg-bg border border-accent2/40 text-xs hover:bg-accent3 hover:text-bg transition shadow-glow"
          >
            Retry Quiz ↻
          </button>

          <button
            onClick={() => navigate(`/lessons`)}
            className="flex-1 px-4 py-2 rounded-xl bg-bg border border-accent2/40 text-xs hover:bg-accent3 hover:text-bg transition shadow-glow"
          >
            Back to Lesson
          </button>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------
  // MAIN QUIZ PAGE
  // -------------------------------------------------
  return (
    <div className="space-y-6 text-textPrimary relative">
      
      {/* Floating Sparkle */}
      <motion.div
        className="absolute right-4 top-0 text-xl opacity-20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ✨
      </motion.div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-headerHighlight drop-shadow-glow">
            🧠 Quiz Time!
          </h1>
          <p className="text-xs text-textSecondary">
            Lesson: {lesson?.title}
          </p>
        </div>

        <div className="text-right text-[11px] text-textSecondary">
          <p>
            Question {currentIdx + 1} / {total}
          </p>
          <p className="font-semibold text-accent3">{progress}% complete</p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-bg border border-accent2/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gradient-main"
        />
      </div>

      {/* QUESTION CARD */}
      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-panel p-6 rounded-2xl border border-accent2/40 shadow-xl space-y-4"
      >
        <p className="font-semibold text-sm flex items-start gap-1">
          <span className="text-accent3 font-bold">
            Q{currentIdx + 1}.
          </span>
          {normalizedQuestion.question}
        </p>

        {/* ========== MCQ (Duolingo-Style Bubbles) ========== */}
        {normalizedQuestion.type === "mcq" && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {normalizedQuestion.options.map((opt, idx) => {
              const selected = answers[currentIdx] === idx;

              return (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  key={idx}
                  onClick={() => setAnswer(idx)}
                  className={`
                    px-4 py-3 rounded-full text-sm font-medium transition-all shadow-md border
                    ${
                      selected
                        ? "bg-accent3 text-white border-accent3 shadow-glow scale-[1.03]"
                        : "bg-bg text-textPrimary border-accent2/30 hover:bg-panel hover:shadow-glow"
                    }
                  `}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* ========== FIB ========== */}
        {normalizedQuestion.type === "fib" && (
          <input
            value={answers[currentIdx] ?? ""}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 rounded-xl bg-bg border border-accent2/40 text-sm shadow focus:border-accent3 outline-none"
          />
        )}
      </motion.div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">

        {/* Previous */}
        <button
          disabled={currentIdx === 0}
          onClick={prevQuestion}
          className={`
            px-4 py-2 rounded-xl text-xs border shadow transition-all
            ${
              currentIdx === 0
                ? "text-textSecondary bg-bg border-accent2/20 cursor-not-allowed"
                : "bg-bg text-textPrimary border-accent2/30 hover:bg-accent3 hover:text-bg shadow-glow"
            }
          `}
        >
          ← Previous
        </button>

        {/* Next or Submit */}
        {currentIdx < total - 1 ? (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 rounded-xl text-xs bg-bg border text-textPrimary border-accent2/30 hover:bg-accent3 hover:text-bg shadow-glow transition"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 rounded-xl bg-gradient-main text-bg text-xs font-semibold shadow-glow hover:scale-105 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Finish Quiz 🎉"}
          </button>
        )}
      </div>
    </div>
  );
}
