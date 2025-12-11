import express from "express";
import auth from "../middleware/auth.js";
import teacher from "../middleware/teacher.js";

import { createLesson } from "../controllers/lessonController.js";
import { addOrUpdateQuiz } from "../controllers/quizController.js";

const router = express.Router();

// LESSON
router.post("/teacher/add-lesson", auth, teacher, createLesson);

// QUIZ
router.post("/teacher/add-quiz", auth, teacher, addOrUpdateQuiz);

export default router;
