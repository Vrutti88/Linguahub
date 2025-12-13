import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuizReview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.review) {
    return (
      <p className="text-center text-textSecondary mt-10">
        No review data found.
      </p>
    );
  }

  const { review, result } = state;

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto pb-12 text-textPrimary">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-headerHighlight text-center drop-shadow-glow"
      >
        📘 Quiz Review
      </motion.h1>

      {/* SCORE CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-panel p-5 rounded-2xl border border-b-[3px] border-accent2/30 shadow-xl text-center"
      >
        <p className="text-sm text-textSecondary">Your Score</p>
        <p className="text-4xl font-extrabold text-accent3">
          {result.score}/{result.total}
        </p>
      </motion.div>

      {/* QUESTIONS LIST */}
      <div className="space-y-5">
        {review.map((q, idx) => {
          const icon = q.isCorrect ? "✔️" : "❌";
          const iconColor = q.isCorrect ? "text-green-500" : "text-red-500";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-5 rounded-2xl bg-panel border border-b-[3px] border-accent2/30 shadow-lg"
            >
              {/* QUESTION HEADING */}
              <div className="flex items-start gap-3">
                <span className={`text-xl ${iconColor}`}>{icon}</span>
                <p className="font-semibold text-sm text-textPrimary">
                  Q{idx + 1}. {q.question}
                </p>
              </div>

              {/* MCQ */}
              {q.type === "mcq" && (
                <div className="mt-4 space-y-2 ml-8">
                  {q.options.map((opt, optionIdx) => {
                    const isCorrectOption = optionIdx === q.correctIndex;
                    const isUserOption = optionIdx === q.userIndex;

                    return (
                      <div
                        key={optionIdx}
                        className={`
                          px-4 py-2 rounded-xl border border-b-2 text-sm transition-all
                          ${
                            isCorrectOption
                              ? "bg-green-500/20 border-green-500 text-green-600 shadow"
                              : isUserOption && !q.isCorrect
                              ? "bg-red-500/20 border-red-500 text-red-600 shadow"
                              : "bg-bg border-accent2/30 text-textPrimary"
                          }
                        `}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* FIB */}
              {q.type === "fib" && (
                <div className="mt-4 ml-8">
                  <p className="text-xs">
                    <strong>Your Answer:</strong>{" "}
                    <span className={q.isCorrect ? "text-green-500" : "text-red-500"}>
                      {q.userAnswer}
                    </span>
                  </p>

                  {!q.isCorrect && (
                    <p className="text-xs mt-1">
                      <strong>Correct Answer:</strong>{" "}
                      <span className="text-green-500">{q.correctAnswer}</span>
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* BACK BUTTON */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate("/lessons")}
        className="w-full px-5 py-3 rounded-xl bg-bg text-textPrimary border border-b-[3px] font-semibold shadow-glow"
      >
        ← Back to lesson
      </motion.button>
    </div>
  );
}
