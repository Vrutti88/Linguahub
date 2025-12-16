import { useState, useEffect } from "react";
import api from "../../api/client.js";
import { motion } from "framer-motion";

export default function AddQuiz() {
    const [lessonId, setLessonId] = useState("");
    const [lessons, setLessons] = useState([]);
    const [message, setMessage] = useState("");

    const [questions, setQuestions] = useState([
        {
            type: "mcq",
            question: "",
            options: ["", "", "", ""],
            answer: 0,
        },
    ]);

    // Fetch lessons
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await api.get("/lessons", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setLessons(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchLessons();
    }, []);

    // Add new question (defaults to MCQ)
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                type: "mcq",
                question: "",
                options: ["", "", "", ""],
                answer: 0,
            },
        ]);
    };

    // Update question text
    const updateField = (qIdx, field, value) => {
        const updated = [...questions];
        updated[qIdx][field] = value;
        setQuestions(updated);
    };

    // Update MCQ option
    const updateOption = (qIdx, optIdx, value) => {
        const updated = [...questions];
        updated[qIdx].options[optIdx] = value;
        setQuestions(updated);
    };

    // Change question type
    const changeType = (qIdx, type) => {
        const updated = [...questions];
        updated[qIdx].type = type;

        if (type === "mcq") {
            updated[qIdx].options = ["", "", "", ""];
            updated[qIdx].answer = 0;
        } else {
            updated[qIdx].options = [];
            updated[qIdx].answer = ""; // text answer
        }

        setQuestions(updated);
    };

    // Submit quiz
    const createQuiz = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await api.post(
                "/teacher/add-quiz",
                { lessonId, questions },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setMessage("✅ Quiz created successfully!");
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to create quiz.");
        }
    };

    return (
        <div className="space-y-8 p-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
                    <motion.span
                        initial={{ rotate: -5, y: 2 }}
                        animate={{ rotate: [-5, 5, -5], y: [2, -2, 2] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        🧩
                    </motion.span>
                    Add Quiz
                </h1>

                <p className="text-textSecondary text-sm">
                    Create a quiz and attach it to a lesson.
                </p>
            </motion.div>

            {/* Message */}
            {message && (
                <p className="text-sm bg-panel border border-accent3/40 text-textPrimary px-4 py-2 rounded-xl shadow-glow">
                    {message}
                </p>
            )}

            {/* Form */}
            <form onSubmit={createQuiz} className="space-y-8 text-textPrimary">
                {/* Select Lesson */}
                <div className="bg-panel p-5 rounded-2xl border border-accent2/30 shadow-xl">
                    <label className="text-textPrimary font-semibold text-sm">
                        Select Lesson
                    </label>

                    <select
                        value={lessonId}
                        onChange={(e) => setLessonId(e.target.value)}
                        required
                        className="w-full mt-2 px-3 py-2 bg-bg border border-accent2/40 text-textPrimary rounded-xl focus:ring-2 focus:ring-accent2"
                    >
                        <option value="">Choose a lesson...</option>
                        {lessons.map((lesson) => (
                            <option key={lesson._id} value={lesson._id}>
                                {lesson.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Questions */}
                {questions.map((q, qIdx) => (
                    <motion.div
                        key={qIdx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-panel p-5 rounded-2xl border border-accent1/30 shadow-xl space-y-4"
                    >
                        <h2 className="text-lg font-semibold text-headerHighlight">
                            Question {qIdx + 1}
                        </h2>

                        {/* Type Selector */}
                        <div>
                            <label className="text-textSecondary text-xs">Question Type</label>
                            <select
                                value={q.type}
                                onChange={(e) => changeType(qIdx, e.target.value)}
                                className="w-full mt-1 px-3 py-2 rounded-xl bg-bg border border-accent2/40 text-sm"
                            >
                                <option value="mcq">Multiple Choice</option>
                                <option value="fib">Fill in the blank</option>
                            </select>
                        </div>

                        {/* Question Input */}
                        <div>
                            <label className="text-textSecondary text-xs">Question</label>
                            <input
                                value={q.question}
                                onChange={(e) => updateField(qIdx, "question", e.target.value)}
                                className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/30 text-textPrimary rounded-xl"
                                placeholder="Enter question..."
                                required
                            />
                        </div>

                        {/* MCQ Options */}
                        {q.type === "mcq" && (
                            <>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {q.options.map((opt, optIdx) => (
                                        <input
                                            key={optIdx}
                                            value={opt}
                                            onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                                            className="px-3 py-2 bg-bg border border-accent2/30 text-textPrimary rounded-xl"
                                            placeholder={`Option ${optIdx + 1}`}
                                            required
                                        />
                                    ))}
                                </div>

                                {/* Correct Option */}
                                <div>
                                    <label className="text-textSecondary text-xs">Correct Option</label>
                                    <select
                                        value={q.answer}
                                        onChange={(e) => updateField(qIdx, "answer", Number(e.target.value))}
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent3/40 text-textPrimary rounded-xl"
                                    >
                                        {q.options.map((_, idx) => (
                                            <option key={idx} value={idx}>
                                                Option {idx + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Fill-in-the-blank correct answer */}
                        {q.type === "fib" && (
                            <div>
                                <label className="text-textSecondary text-xs">Correct Answer</label>
                                <input
                                    value={q.answer}
                                    onChange={(e) => updateField(qIdx, "answer", e.target.value)}
                                    className="w-full mt-1 px-3 py-2 bg-bg border border-accent3/40 text-textPrimary rounded-xl"
                                    placeholder="Exact answer text"
                                    required
                                />
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Add Question Button */}
                <button
                    type="button"
                    onClick={addQuestion}
                    className="px-4 py-2 bg-bg border border-b-[2.5px] text-textPrimary rounded-xl shadow-glow font-semibold hover:scale-105 transition mr-4"
                >
                    ➕ Add Another Question
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-bg border border-b-[2.5px] text-textPrimary shadow-glow font-semibold hover:scale-105 active:scale-95 transition"
                >
                    Save Quiz
                </button>
            </form>
        </div>
    );
}
