import { useEffect, useState } from "react";
import api from "../../api/client";
import { motion } from "framer-motion"

export default function ManageQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Editor state
    const [editingQuiz, setEditingQuiz] = useState(null); // lessonId
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]);

    const [viewingQuiz, setViewingQuiz] = useState(null);
    const [dragIndex, setDragIndex] = useState(null);

    // Load all quizzes
    const load = async () => {
        try {
            const res = await api.get("/teacher/quizzes");
            setQuizzes(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // Delete quiz
    const deleteQuiz = async (id) => {
        if (!window.confirm("Are you sure you want to delete this quiz?")) return;

        try {
            await api.delete(`/teacher/delete-quiz/${id}`);
            setQuizzes((prev) => prev.filter((q) => q._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const normalizeQuestion = (q) => ({
        type: q.type || (q.answerText ? "fib" : "mcq"),
        question: q.question || "",
        options: q.options && q.options.length ? q.options : ["", "", "", ""],
        answer: typeof q.answer === "number" ? q.answer : 0,
        answerText: q.answerText || ""
    });


    // Open full editor page
    const openEditor = async (lessonId) => {
        setLoading(true);
        setEditingQuiz(lessonId);
        setLesson(null);
        setQuestions([]);

        try {
            const quizRes = await api.get(`/quiz/${lessonId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const normalized = (quizRes.data.questions || []).map((q) => ({
                type: q.type || "mcq",
                question: q.question || "",
                options: q.options?.length ? q.options : ["", "", "", ""],
                answer: typeof q.answer === "number" ? q.answer : 0,
                answerText: q.answerText || "",
            }));

            setQuestions(normalized);

            const lessonRes = await api.get(`/lesson/${lessonId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setLesson(lessonRes.data);

        } catch (err) {
            console.error(err);
            alert("This lesson has no quiz yet.");
            setEditingQuiz(null);
        } finally {
            setLoading(false);
        }
    };


    // Update question data
    const updateField = (qIdx, field, value) => {
        const updated = [...questions];
        updated[qIdx][field] = value;
        setQuestions(updated);
    };

    const updateOption = (qIdx, optIdx, value) => {
        const updated = [...questions];
        updated[qIdx].options[optIdx] = value;
        setQuestions(updated);
    };

    const deleteQuestion = (qIdx) => {
        if (!window.confirm("Delete this question?")) return;
        const updated = [...questions];
        updated.splice(qIdx, 1);
        setQuestions(updated);
    };
    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                type: "mcq",
                question: "",
                options: ["", "", "", ""],
                answer: 0,
                answerText: "",
            },
        ]);
    };

    // Drag reorder
    const handleDragStart = (index) => {
        setDragIndex(index);
    };

    const handleDrop = (index) => {
        if (dragIndex === null || dragIndex === index) return;

        const updated = [...questions];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(index, 0, moved);

        setQuestions(updated);
        setDragIndex(null);
    };

    const handleDragOver = (e) => e.preventDefault();

    // Validation
    const validateQuestions = () => {
        const errors = [];

        questions.forEach((q, idx) => {
            const qNum = idx + 1;

            if (!q.question.trim()) {
                errors.push(`Q${qNum}: question text is empty.`);
            }

            if (q.type === "fib") {
                if (!q.answerText.trim()) {
                    errors.push(`Q${qNum}: fill-in-the-blank answer required.`);
                }
            }

            if (q.type === "mcq") {
                const filled = q.options.filter((o) => o.trim());
                if (filled.length < 2) errors.push(`Q${qNum}: at least 2 options required.`);

                if (
                    typeof q.answer !== "number" ||  // Ensures answer is an index number
                    !q.options[q.answer] ||  // Checks if selected option exists
                    !q.options[q.answer].trim()  //Ensures selected option is not empty
                ) {
                    errors.push(`Q${qNum}: invalid correct option.`);
                }
            }
        });

        return errors;
    };

    const saveQuiz = async () => {
        const errors = validateQuestions();
        if (errors.length > 0) {
            alert("Fix these before saving:\n\n• " + errors.join("\n• "));
            return;
        }

        try {
            await api.put(`/teacher/edit-quiz/${editingQuiz}`, {
                lessonId: editingQuiz,
                questions,
            });

            alert("Quiz saved successfully!");
            setEditingQuiz(null);
            load();
        } catch (err) {
            alert("Failed to save quiz.");
            console.error(err);
        }
    };

    // VIEW MODAL
    const viewModal = viewingQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-40 p-4">
            <div
                className="
          bg-panel border border-accent2/30 shadow-xl rounded-2xl 
          w-[65vw] h-[85vh] 
          p-8 space-y-6 text-textPrimary 
          overflow-y-auto
        "
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h2 className="text-2xl font-extrabold text-headerHighlight drop-shadow-glow">
                            👁️ Viewing Quiz
                        </h2>
                        <p className="text-textSecondary text-sm">
                            Lesson:{" "}
                            <span className="font-semibold text-headerHighlight">
                                {viewingQuiz.lessonId?.title}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={() => setViewingQuiz(null)}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 shadow-lg"
                    >
                        ✕ Close
                    </button>
                </div>

                {/* QUESTIONS */}
                <div className="space-y-6">
                    {viewingQuiz.questions.map((raw, idx) => {
                        const q = {
                            type: raw.type || (raw.answerText ? "fib" : "mcq"),
                            question: raw.question || "",
                            options: raw.options?.length ? raw.options : ["", "", "", ""],
                            answer: typeof raw.answer === "number" ? raw.answer : 0,
                            answerText: raw.answerText || "",
                        };

                        return (
                            <div
                                key={idx}
                                className="bg-bg border border-accent2/30 rounded-xl p-5 shadow space-y-6"
                            >
                                <p className="font-semibold text-sm">
                                    <span className="text-accent3">Q{idx + 1}.</span> {q.question}
                                </p>

                                {/* MCQ VIEW */}
                                {q.type === "mcq" && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {q.options.map((opt, optIdx) => (
                                            <div
                                                key={optIdx}
                                                className={`px-3 py-2 rounded-xl border text-xs ${optIdx === q.answer
                                                    ? "bg-accent3 border-accent3 text-white shadow-glow"
                                                    : "bg-panel border-accent2/20 text-textPrimary"
                                                    }`}
                                            >
                                                {optIdx + 1}. {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* FILL-IN-VIEW */}
                                {q.type === "fib" && (
                                    <div className="p-3 bg-accent3/20 rounded-xl border border-accent3/40">
                                        <p className="text-xs">
                                            <span className="font-semibold text-accent3">Correct Answer:</span>{" "}
                                            {q.answerText || "❌ (empty)"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    // FULL PAGE EDIT VIEW
    if (editingQuiz) {
        return (
            <div className="space-y-8 p-4 text-textPrimary">
                {/* HEADER */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow">
                        ✏️ Edit Quiz
                    </h1>

                    <p className="text-textSecondary text-sm">
                        Lesson:{" "}
                        <span className="font-semibold text-headerHighlight">
                            {lesson?.title}
                        </span>
                    </p>
                </div>

                {/* QUESTIONS */}
                <div className="space-y-6">
                    {questions.map((q, qIdx) => (
                        <div
                            key={qIdx}
                            draggable
                            onDragStart={() => handleDragStart(qIdx)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(qIdx)}
                            className={`bg-panel border border-accent2/30 rounded-2xl p-6 shadow-xl space-y-6 transition-all hover:shadow-glow ${dragIndex === qIdx ? "opacity-70" : ""
                                }`}
                        >
                            {/* Top row: Label + Type + Drag icon */}
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-textSecondary">
                                    Question {qIdx + 1}
                                </label>

                                <select
                                    value={q.type}
                                    onChange={(e) =>
                                        updateField(qIdx, "type", e.target.value)
                                    }
                                    className="px-2 py-1 rounded-lg bg-bg border border-accent2/40 text-[11px]"
                                >
                                    <option value="mcq">MCQ</option>
                                    <option value="fib">Fill-in</option>
                                </select>

                                <span className="text-[10px] text-textSecondary select-none">
                                    ⠿ Drag
                                </span>
                            </div>

                            {/* QUESTION */}
                            <input
                                value={q.question}
                                onChange={(e) => updateField(qIdx, "question", e.target.value)}
                                placeholder="Enter question..."
                                className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/40 text-sm focus:border-accent1 focus:shadow-glow transition-all"
                            />

                            {/* MCQ OPTIONS */}
                            {q.type === "mcq" && (
                                <div className="grid grid-cols-2 gap-3">
                                    {q.options.map((opt, optIdx) => (
                                        <input
                                            key={optIdx}
                                            value={opt}
                                            onChange={(e) =>
                                                updateOption(qIdx, optIdx, e.target.value)
                                            }
                                            placeholder={`Option ${optIdx + 1}`}
                                            className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/40 text-xs focus:border-accent1 focus:shadow-glow transition-all"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* FILL-IN ANSWER */}
                            {q.type === "fib" && (
                                <div className="space-y-1">
                                    <label className="text-[11px] text-textSecondary">Correct Answer</label>
                                    <input
                                        value={q.answerText}
                                        onChange={(e) =>
                                            updateField(qIdx, "answerText", e.target.value)
                                        }
                                        placeholder="Correct text answer"
                                        className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/40 text-xs focus:border-accent1 focus:shadow-glow transition-all"
                                    />
                                </div>
                            )}

                            {/* ANSWER + DELETE */}
                            <div className="flex items-center justify-between gap-2">
                                {/* MCQ correct answer */}
                                {q.type === "mcq" && (
                                    <div className="flex-1">
                                        <label className="text-[11px] font-semibold text-textSecondary">
                                            Correct Option
                                        </label>
                                        <select
                                            value={q.answer}
                                            onChange={(e) =>
                                                updateField(qIdx, "answer", Number(e.target.value))
                                            }
                                            className="w-full mt-1 px-3 py-2 rounded-xl bg-bg border border-accent2/40 text-xs focus:border-accent1 focus:shadow-glow transition-all"
                                        >
                                            {q.options.map((_, idx) => (
                                                <option key={idx} value={idx}>
                                                    Option {idx + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Right side buttons */}
                                <div className="flex gap-2 mt-6">
                                    <button
                                        onClick={() => deleteQuestion(qIdx)}
                                        className="px-3 py-2 rounded-xl bg-red-500 text-white text-xs hover:bg-red-600 shadow"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ADD QUESTION */}
                <button
                    onClick={addQuestion}
                    className="w-full px-5 py-3 rounded-xl bg-bg border border-b-[2.5px] text-textPrimary font-semibold shadow-glow"
                >
                    ➕ Add New Question
                </button>

                {/* ACTION BUTTONS */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={() => setEditingQuiz(null)}
                        className="px-5 py-2 rounded-xl bg-bg border border-b-[2.5px] text-textPrimary text-sm shadow-glow"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={saveQuiz}
                        className="px-5 py-2 bg-bg border border-b-[2.5px] text-textPrimary font-bold rounded-xl shadow-glow"
                    >
                        Save Quiz
                    </button>
                </div>
            </div>
        );
    }

    // QUIZ LIST VIEW
    return (
        <div className="space-y-6 p-4">
            {viewModal}
            <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow">
                ❓ Manage Quizzes
            </h1>

            {loading && <p className="text-textSecondary text-sm">Loading quizzes...</p>}

            {!loading && quizzes.length === 0 && (
                <p className="text-textSecondary text-sm">No quizzes found.</p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">


                {quizzes.map((q) => (
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

                        <motion.div
                            className="absolute top-0 left-0 w-full h-[3px] bg-accent2 opacity-0 group-hover:opacity-100"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                        ></motion.div>
                        <div>
                            <p className="font-bold text-headerHighlight drop-shadow-glow text-sm mb-2">
                                Lesson: {q.lessonId?.title || "Unknown"}
                            </p>
                            <p className="text-[12px] text-textSecondary mb-4">
                                {q.questions.length} questions
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {/* View quiz */}
                            <button
                                onClick={() =>
                                    setViewingQuiz({ ...q, questions: q.questions.map(normalizeQuestion), })}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl  text-xs
                       bg-bg border border-b-2 border-accent2/30 text-textPrimary 
                       hover:bg-accent3 hover:text-textPrimary 
                       hover:shadow-glow transition-all"
                            >
                                👁 View
                            </button>

                            {/* Edit */}
                            <button
                                onClick={() => openEditor(q.lessonId?._id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl  text-xs
                       bg-bg border border-b-2 border-accent2/30 text-textPrimary 
                       hover:bg-accent3 hover:text-textPrimary 
                       hover:shadow-glow transition-all"
                            >
                                ✏️ Edit
                            </button>

                            {/* Delete */}
                            <button
                                onClick={() => deleteQuiz(q._id)}
                                className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                    // </div>
                ))}
            </div>
        </div>
    );
}
