import express from "express";
import auth from "../middleware/auth.js";
import {
  getLessonProgress
} from "../controllers/progressController.js";

const router = express.Router();

// Get progress for a lesson
router.get("/progress/:lessonId", auth, getLessonProgress);

export default router;
