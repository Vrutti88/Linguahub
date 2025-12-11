import { useEffect, useState } from "react";
import api from "../../api/client";
import LessonCard from "../../components/LessonCard";

export default function ManageLessons() {

    const LANGUAGES = [
        { name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
        { name: "French", flag: "https://flagcdn.com/w40/fr.png" },
        { name: "German", flag: "https://flagcdn.com/w40/de.png" },
        { name: "Japanese", flag: "https://flagcdn.com/w40/jp.png" },
        { name: "Korean", flag: "https://flagcdn.com/w40/kr.png" },
        { name: "Italian", flag: "https://flagcdn.com/w40/it.png" },
        { name: "Chinese", flag: "https://flagcdn.com/w40/cn.png" },
        { name: "Hindi", flag: "https://flagcdn.com/w40/in.png" },
        { name: "Russian", flag: "https://flagcdn.com/w40/ru.png" },
        { name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
        { name: "Portuguese", flag: "https://flagcdn.com/w40/br.png" },
        { name: "English", flag: "https://flagcdn.com/w40/us.png" },
    ];


    const [lessons, setLessons] = useState([]);

    const [viewLesson, setViewLesson] = useState(null);
    const [editingLesson, setEditingLesson] = useState(null);

    const [quizModalLesson, setQuizModalLesson] = useState(null);
    const [lessonQuizzes, setLessonQuizzes] = useState([]);

    const [viewingQuiz, setViewingQuiz] = useState(null);

    const loadLessonQuizzes = async (lessonId) => {
        try {
            const res = await api.get("/teacher/quizzes");

            const filtered = res.data.filter(q => q.lessonId?._id === lessonId);
            setLessonQuizzes(filtered);

        } catch (err) {
            console.error(err);
        }
    };


    const [editData, setEditData] = useState({
        title: "",
        description: "",
        level: "beginner",
        language: "",
        contents: [],
    });

    // LOAD LESSONS
    const loadLessons = async () => {
        try {
            const res = await api.get("/lessons");
            setLessons(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadLessons();
    }, []);

    // DELETE LESSON
    const deleteLesson = async (id) => {
        if (!window.confirm("Delete this lesson?")) return;
        try {
            await api.delete(`/teacher/lesson/${id}`);
            loadLessons();
        } catch (err) {
            console.error(err);
        }
    };

    // OPEN EDIT PAGE
    const openEditor = (lesson) => {
        setEditingLesson(lesson._id);
        setEditData({
            title: lesson.title || "",
            description: lesson.description || "",
            level: lesson.level || "beginner",
            language: lesson.language || "",
            contents: Array.isArray(lesson.contents) ? lesson.contents : [],
        });
    };

    // FIELD UPDATE
    const updateField = (field, value) => {
        setEditData((prev) => ({ ...prev, [field]: value }));
    };

    // CONTENT ITEM UPDATE
    const updateContent = (i, field, value) => {
        const updated = [...editData.contents];
        updated[i][field] = value;
        setEditData((prev) => ({ ...prev, contents: updated }));
    };

    // ADD ITEM
    const addContent = () => {
        setEditData((prev) => ({
            ...prev,
            contents: [
                ...prev.contents,
                {
                    src: "",
                    target: "",
                    pronunciation: "",
                    imageUrl: "",
                    audioUrl: "",
                    videoUrl: "",
                    tags: [],
                },
            ],
        }));
    };

    // DELETE ITEM
    const deleteContent = (i) => {
        const updated = [...editData.contents];
        updated.splice(i, 1);
        setEditData((prev) => ({ ...prev, contents: updated }));
    };

    // SAVE LESSON
    const saveLesson = async () => {
        try {
            await api.put(`/teacher/lesson/${editingLesson}`, editData);
            alert("Lesson updated!");
            setEditingLesson(null);
            loadLessons();
        } catch (err) {
            console.error(err);
            alert("Failed to save lesson");
        }
    };

    // -------------------------------------------------------------------
    // FULL PAGE EDITOR (LIKE QUIZ EDITOR) — 100% WORKING
    // -------------------------------------------------------------------
    if (editingLesson) {
        return (
            <div className="space-y-6 px-4 pb-10 text-textPrimary">
                <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow">
                    ✏️ Edit Lesson
                </h1>

                {/* BASIC FIELDS */}
                <div className="bg-panel p-5 rounded-2xl border border-accent2/30 shadow-xl space-y-4">

                    {/* LANGUAGE FIELD */}
                    <div>
                        <label className="text-xs text-textSecondary">Language</label>
                        <select
                            value={editData.language}
                            onChange={(e) => updateField("language", e.target.value)}
                            className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                        >
                            <option value="">Select Language</option>
                            {LANGUAGES.map((lang) => (
                                <option key={lang.name} value={lang.name}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="text-xs text-textSecondary">Title</label>
                        <input
                            value={editData.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-textSecondary">Description</label>
                        <textarea
                            value={editData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            className="w-full h-24 px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-textSecondary">Level</label>
                        <select
                            value={editData.level}
                            onChange={(e) => updateField("level", e.target.value)}
                            className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                </div>

                {/* ITEMS */}
                <h2 className="text-lg font-bold text-headerHighlight">Lesson Items</h2>

                <div className="space-y-4">
                    {editData.contents.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-panel p-4 rounded-xl border border-accent2/30 shadow space-y-3"
                        >
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold">Item {idx + 1}</p>

                                <button
                                    onClick={() => deleteContent(idx)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs"
                                >
                                    Delete
                                </button>
                            </div>

                            <label className="text-xs text-textSecondary">Source Text:</label>
                            <input
                                placeholder="Source text"
                                value={item.src}
                                onChange={(e) => updateContent(idx, "src", e.target.value)}
                                className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                            />

                            <label className="text-xs text-textSecondary">Translation:</label>
                            <input
                                placeholder="Translation"
                                value={item.target}
                                onChange={(e) => updateContent(idx, "target", e.target.value)}
                                className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                            />

                            <label className="text-xs text-textSecondary">Pronunciation:</label>
                            <input
                                placeholder="Pronunciation"
                                value={item.pronunciation}
                                onChange={(e) => updateContent(idx, "pronunciation", e.target.value)}
                                className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                            />

                            <label className="text-xs text-textSecondary">Image URL:</label>
                            <input
                                placeholder="Image URL"
                                value={item.imageUrl}
                                onChange={(e) => updateContent(idx, "imageUrl", e.target.value)}
                                className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                            />

                            <label className="text-xs text-textSecondary">Audio URL:</label>
                            <input
                                placeholder="Audio URL"
                                value={item.audioUrl}
                                onChange={(e) => updateContent(idx, "audioUrl", e.target.value)}
                                className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                            />

                            <label className="text-xs text-textSecondary">Video URL:</label>
                            <input
                                placeholder="Video URL"
                                value={item.videoUrl}
                                onChange={(e) => updateContent(idx, "videoUrl", e.target.value)}
                                className="w-full px-3 py-2 bg-bg border border-accent2/40 rounded-xl"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={addContent}
                    className="w-full px-5 py-3 rounded-xl bg-accent3 text-bg font-semibold shadow-glow"
                >
                    ➕ Add New Item
                </button>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setEditingLesson(null)}
                        className="px-5 py-2 bg-gray-500 text-white rounded-xl"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={saveLesson}
                        className="px-6 py-3 bg-accent3 text-bg rounded-xl shadow-glow"
                    >
                        Save Lesson
                    </button>
                </div>

            </div>
        );
    }

    // -------------------------------------------------------------------
    // NORMAL VIEW
    // -------------------------------------------------------------------
    return (
        <div className="space-y-6 px-4">

            <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow">
                📝 Manage Lessons
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                    <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                        onDelete={deleteLesson}
                        onView={() => setViewLesson(lesson)}
                        onEdit={() => openEditor(lesson)}
                        onEditQuiz={() => {
                            setQuizModalLesson(lesson);
                            loadLessonQuizzes(lesson._id);
                        }}

                    />
                ))}
            </div>

            {/* VIEW MODAL */}
            {viewLesson && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50 p-4">

                    <div className="bg-panel border border-accent2/40 rounded-3xl shadow-2xl 
                    w-[90%] md:w-[70%] lg:w-[55%] 
                    max-h-[90vh] overflow-y-auto p-8 space-y-6 animate-fadeIn">

                        {/* HEADER */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
                                📘 {viewLesson.title}
                            </h2>

                            <button
                                onClick={() => setViewLesson(null)}
                                className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 shadow-lg"
                            >
                                ✕ Close
                            </button>
                        </div>

                        <p className="text-textSecondary text-sm leading-relaxed border-l-4 border-accent3 pl-3">
                            {viewLesson.description}
                        </p>

                        <hr className="border-accent2/40" />

                        {/* CONTENT */}
                        <div className="space-y-5">
                            {viewLesson.contents?.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-bg border border-accent2/40 rounded-xl p-5 shadow-xl 
                       hover:shadow-glow transition-all duration-200 space-y-3"
                                >
                                    {/* Word + Translation */}
                                    <p className="text-lg font-bold text-accent3">
                                        {idx + 1}. {item.src}
                                    </p>

                                    <p className="text-sm text-textPrimary">
                                        <span className="font-semibold text-accent1">Translation:</span>{" "}
                                        {item.target}
                                    </p>

                                    {/* Pronunciation */}
                                    {item.pronunciation && (
                                        <p className="text-xs text-accent2 font-medium bg-accent2/10 px-2 py-1 rounded-lg inline-block">
                                            <span className="font-semibold text-accent1">Pronunciation:</span>{" "} {item.pronunciation}
                                        </p>
                                    )}

                                    {/* Image */}
                                    {item.imageUrl && (
                                        <div className="mt-2">
                                            <p className="text-xs font-semibold text-accent1 mb-1">Image:</p>
                                            <img
                                                className="w-32 rounded-xl border border-accent2/30 shadow-md"
                                                src={item.imageUrl}
                                            />
                                        </div>
                                    )}

                                    {/* Audio */}
                                    {item.audioUrl && (
                                        <div className="mt-2">
                                            <p className="text-xs font-semibold text-accent1 mb-1">Audio:</p>
                                            <audio controls className="w-full">
                                                <source src={item.audioUrl} />
                                            </audio>
                                        </div>
                                    )}

                                    {/* Video */}
                                    {item.videoUrl && (
                                        <div className="mt-2">
                                            <p className="text-xs font-semibold text-accent1 mb-1">Video:</p>
                                            <video
                                                controls
                                                className="w-full rounded-xl border border-accent2/30 shadow-lg"
                                            >
                                                <source src={item.videoUrl} />
                                            </video>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {quizModalLesson && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50 p-4 animate-fadeIn">

                    <div className="
      bg-panel w-[95%] md:w-[75%] lg:w-[60%] 
      max-h-[90vh] overflow-y-auto 
      rounded-3xl border border-accent2/40 shadow-2xl 
      p-8 space-y-8 animate-slideUp
    ">

                        {/* HEADER */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
                                🧩 Quizzes for "{quizModalLesson.title}"
                            </h2>

                            <button
                                className="px-4 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 shadow-lg"
                                onClick={() => setQuizModalLesson(null)}
                            >
                                ✕ Close
                            </button>
                        </div>

                        {/* QUIZ LIST */}
                        {lessonQuizzes.length > 0 ? (
                            <div className="space-y-5">
                                {lessonQuizzes.map((quiz) => (
                                    <div
                                        key={quiz._id}
                                        className="bg-bg border border-accent2/40 rounded-xl p-5 shadow-xl hover:shadow-glow transition-all duration-200 space-y-3"
                                    >
                                        <p className="text-lg font-bold text-accent3">
                                            {quiz.questions.length} Questions
                                        </p>

                                        <button
                                            onClick={() =>
                                                setViewingQuiz({
                                                    ...quiz,
                                                    questions: quiz.questions.map((q) => ({
                                                        type: q.type || (q.answerText ? "fib" : "mcq"),
                                                        question: q.question || "",
                                                        options: q.options?.length ? q.options : ["", "", "", ""],
                                                        answer: typeof q.answer === "number" ? q.answer : 0,
                                                        answerText: q.answerText || "",
                                                    })),
                                                })
                                            }
                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl 
                                                        bg-bg border border-accent2/30 text-textPrimary 
                                                        hover:bg-accent3 hover:text-textPrimary 
                                                        hover:shadow-glow transition-all text-xs"
                                        >
                                            👁 View Quiz
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-textSecondary italic text-center text-sm py-6">
                                ❌ No quizzes for this lesson.
                            </p>
                        )}

                    </div>
                </div>
            )}

            {/* QUIZ VIEW MODAL (REQUIRED!!) */}
            {viewingQuiz && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-[999] p-4 text-textPrimary">

                    <div className="bg-panel w-[90%] md:w-[70%] lg:w-[65%] max-h-[90vh]
                    overflow-y-auto rounded-3xl border border-accent2/40 
                    shadow-2xl p-8 space-y-6">

                        {/* HEADER */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-headerHighlight drop-shadow-glow">
                                👁 Viewing Quiz — {quizModalLesson?.title}
                            </h2>

                            <button
                                onClick={() => setViewingQuiz(null)}
                                className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 shadow"
                            >
                                ✕ Close
                            </button>
                        </div>

                        {/* QUESTIONS */}
                        <div className="space-y-5">
                            {viewingQuiz.questions.map((q, idx) => (
                                <div
                                    key={idx}
                                    className="bg-bg border border-accent2/40 p-5 rounded-xl shadow space-y-3"
                                >
                                    <p className="font-semibold text-sm">
                                        <span className="text-accent3">Q{idx + 1}.</span> {q.question}
                                    </p>

                                    {/* MCQ */}
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

                                    {/* FILL IN THE BLANK */}
                                    {q.type === "fib" && (
                                        <div className="p-3 bg-accent3/20 border border-accent3/40 rounded-xl text-xs">
                                            <strong className="text-accent3">Correct Answer:</strong> {q.answerText}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
