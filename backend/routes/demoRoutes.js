import express from "express";
import { users, lessons, quizzes } from "../seed/demoData.js";
import User from "../models/user.js";
import Lesson from "../models/lesson.js";
import Quiz from "../models/quiz.js";

const router = express.Router();

router.post("/demo/generate", async (req, res) => {
  try {
    await User.insertMany(users, { ordered: false });
    await Lesson.insertMany(lessons, { ordered: false });
    await Quiz.insertMany(quizzes, { ordered: false });

    res.status(200).json({
      success: true,
      counts: {
        users: users.length,
        lessons: lessons.length,
        quizzes: quizzes.length
      }
    });
  } catch (error) {
    // Ignore duplicate data errors (E11000)
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Demo data already exists (duplicates skipped)",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add demo data",
      error: error.message
    });
  }
});

export default router;
