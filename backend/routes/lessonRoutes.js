import express from "express";
import auth from "../middleware/auth.js";
import teacher from "../middleware/teacher.js";

import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} from "../controllers/lessonController.js";

const router = express.Router();

// STUDENT + TEACHER (both must be logged in)
router.get("/lessons", auth, getLessons);
router.get("/lesson/:id", auth, getLessonById);

// TEACHER ONLY ROUTES
router.post("/teacher/lesson", auth, teacher, createLesson);
router.put("/teacher/lesson/:id", auth, teacher, updateLesson);
router.delete("/teacher/lesson/:id", auth, teacher, deleteLesson);

export default router;
