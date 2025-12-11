import express from "express";
import auth from "../middleware/auth.js";
import {
  markLessonComplete,
  getLessonProgress
} from "../controllers/progressController.js";

const router = express.Router();

// Save completion
router.post("/progress/complete", auth, markLessonComplete);

// Get progress for a lesson
router.get("/progress/:lessonId", auth, getLessonProgress);

export default router;
