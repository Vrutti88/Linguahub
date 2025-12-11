import Lesson from "../models/lesson.js";

// 🟩 Student & Teacher - Get Lessons
import User from "../models/user.js";

export const getLessons = async (req, res) => {
  try {
    const role = req.user.role;

    if (role === "teacher") {
      // Teacher sees all lessons
      const lessons = await Lesson.find().sort({ order: 1 });
      return res.json(lessons);
    }

    // 🟦 Student → fetch language from onboarding
    const user = await User.findById(req.user.id);

    const selectedLanguage = user?.onboarding?.language;

    if (!selectedLanguage) {
      return res.status(400).json({ msg: "User has no language selected" });
    }

    // 🟩 Student sees only published lessons for their selected language
    const lessons = await Lesson.find({
      isPublished: true,
      language: selectedLanguage,
    }).sort({ order: 1 });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch lessons" });
  }
};


// 🟩 Get lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });

    if (!lesson.isPublished && req.user.role !== "teacher") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch lesson" });
  }
};

// 🟨 Teacher - Create Lesson
export const createLesson = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };

    // ensure contents array exists
    if (!Array.isArray(data.contents)) data.contents = [];

    const lesson = await Lesson.create(data);

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create lesson" });
  }
};

// 🟧 Teacher - Update Lesson
export const updateLesson = async (req, res) => {
  try {
    const data = { ...req.body };

    // ensure contents is array if provided
    if (data.contents && !Array.isArray(data.contents))
      data.contents = [];

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update lesson" });
  }
};

// 🟥 Teacher - Delete Lesson
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });

    res.json({ msg: "Lesson deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete lesson" });
  }
};
