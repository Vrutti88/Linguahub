import { useState } from "react";
import api from "../../api/client";
import { motion, AnimatePresence } from "framer-motion";

export default function AddLesson() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("beginner");
    const [time, setTime] = useState("");
    const [image, setImage] = useState("");

    const LANGUAGES = [
        { name: "Spanish", code: "es" },
        { name: "French", code: "fr" },
        { name: "Japanese", code: "jp" },
        { name: "German", code: "de" },
        { name: "Korean", code: "kr" },
        { name: "Italian", code: "it" },
        { name: "Chinese", code: "cn" },
        { name: "Hindi", code: "in" },
        { name: "Russian", code: "ru" },
        { name: "Arabic", code: "ar" },
        { name: "Portuguese", code: "pt" },
        { name: "English", code: "en" },
    ];

    const [contents, setContents] = useState([
        { src: "", target: "", pronunciation: "", imageUrl: "", audioUrl: "", videoUrl: "" },
    ]);

    const [message, setMessage] = useState("");
    const [lessonLanguage, setLessonLanguage] = useState("");

    // Add item
    const addItem = () => {
        setContents([
            ...contents,
            { src: "", target: "", pronunciation: "", imageUrl: "", audioUrl: "", videoUrl: "" },
        ]);
    };

    const removeItem = (i) => {
        if (contents.length === 1)
            return alert("At least one item is required.");
        const updated = [...contents];  //copies array
        updated.splice(i, 1);
        setContents(updated);
    };

    const updateField = (i, field, value) => {
        const updated = [...contents];
        updated[i][field] = value;
        setContents(updated);
    };

    const saveLesson = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!title.trim()) return alert("Lesson title is required.");
        if (!description.trim()) return alert("Lesson description is required.");

        try {
            await api.post(
                "/teacher/lesson",
                {
                    title,
                    description,
                    level,
                    estimatedTime: time,
                    image,
                    language: lessonLanguage,
                    contents,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            setMessage("✅ Lesson added successfully!");

            setTitle("");
            setDescription("");
            setLevel("beginner");
            setTime("");
            setImage("");
            setContents([{ src: "", target: "", pronunciation: "", imageUrl: "", audioUrl: "", videoUrl: "" }]);
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to create lesson.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-8 p-4 relative"
        >

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
                    <motion.span
                        initial={{ rotate: -5, y: 2 }}
                        animate={{ rotate: [-5, 5, -5], y: [2, -2, 2] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        📘
                    </motion.span>
                    Add Lesson
                </h1>

                <p className="text-textSecondary text-sm">
                    Create a lesson that students will study before taking quizzes.
                </p>
            </motion.div>

            {message && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-sm bg-panel border border-accent3/40 text-textPrimary px-4 py-2 rounded-xl shadow-glow"
                >
                    {message}
                </motion.p>
            )}

            <form onSubmit={saveLesson} className="space-y-8">

                {/* Lesson Details Panel */}
                <motion.div
                    className="bg-panel p-5 rounded-2xl border border-accent2/30 shadow-xl space-y-4"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-semibold text-headerHighlight text-lg"
                    >
                        Lesson Details
                    </motion.h2>

                    {/* Language */}
                    <div>
                        <label className="text-textSecondary text-xs">Language</label>
                        <select
                            value={lessonLanguage}
                            onChange={(e) => setLessonLanguage(e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                            required
                        >
                            <option value="">Select a language</option>
                            {LANGUAGES.map((lang) => (
                                <option key={lang.code} value={lang.name}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-textSecondary text-xs">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                            placeholder="Lesson title..."
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-textSecondary text-xs">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary h-24"
                            placeholder="Short description..."
                            required
                        />
                    </div>

                    {/* Level + Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-textSecondary text-xs">Level</label>
                            <select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-textSecondary text-xs">Estimated Time</label>
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                placeholder="e.g., 5 minutes"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* CONTENT ITEMS */}
                <div className="space-y-6">
                    <h2 className="font-semibold text-headerHighlight text-lg">
                        Lesson Content
                    </h2>

                    <AnimatePresence>   {/* entry/exit animations */}
                        {contents.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                                className="bg-panel p-5 rounded-2xl border border-accent1/30 shadow-xl space-y-4 relative"
                            >
                                {/* Remove Button */}
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.07 }}
                                    onClick={() => removeItem(idx)}
                                    className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-red-500 text-white text-xs hover:bg-red-600 shadow"
                                >
                                    Remove
                                </motion.button>

                                {/* FIELDS */}
                                <div>
                                    <label className="text-textSecondary text-xs">Source</label>
                                    <input
                                        value={item.src}
                                        onChange={(e) => updateField(idx, "src", e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                        placeholder="e.g., Hello"
                                    />
                                </div>

                                <div>
                                    <label className="text-textSecondary text-xs">Translation</label>
                                    <input
                                        value={item.target}
                                        onChange={(e) => updateField(idx, "target", e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                        placeholder="e.g., Hola"
                                    />
                                </div>

                                <div>
                                    <label className="text-textSecondary text-xs">
                                        Pronunciation
                                    </label>
                                    <input
                                        value={item.pronunciation}
                                        onChange={(e) =>
                                            updateField(idx, "pronunciation", e.target.value)
                                        }
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                        placeholder="e.g., oh-la"
                                    />
                                </div>

                                <div>
                                    <label className="text-textSecondary text-xs">
                                        Image URL
                                    </label>
                                    <input
                                        value={item.imageUrl}
                                        onChange={(e) =>
                                            updateField(idx, "imageUrl", e.target.value)
                                        }
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                        placeholder="Image URL"
                                    />
                                </div>

                                <div>
                                    <label className="text-textSecondary text-xs">
                                        Audio URL
                                    </label>
                                    <input
                                        value={item.audioUrl}
                                        onChange={(e) =>
                                            updateField(idx, "audioUrl", e.target.value)
                                        }
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                        placeholder="Audio URL"
                                    />
                                </div>

                                <div>
                                    <label className="text-textSecondary text-xs">
                                        Video URL
                                    </label>
                                    <input
                                        value={item.videoUrl}
                                        onChange={(e) =>
                                            updateField(idx, "videoUrl", e.target.value)
                                        }
                                        className="w-full mt-1 px-3 py-2 bg-bg border border-accent2/40 rounded-xl text-textPrimary"
                                        placeholder="Video URL"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* ADD ITEM BUTTON */}
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={addItem}
                    className="px-4 py-2 bg-bg text-textPrimary border border-b-[2.5px] rounded-xl shadow-glow font-semibold transition mr-4"
                >
                    ➕ Add Another Item
                </motion.button>

                {/* SAVE LESSON BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    type="submit"
                    className="px-6 py-2 bg-bg text-textPrimary border border-b-[2.5px] font-semibold rounded-xl shadow-glow transition"
                >
                    Save Lesson
                </motion.button>
            </form>
        </motion.div>
    );
}
