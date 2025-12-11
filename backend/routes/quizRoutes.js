import express from "express";
import {
  getQuiz,
  submitQuiz,
  addOrUpdateQuiz,
  getAllQuizzes,
  deleteQuiz,
  getQuizByLessonId
} from "../controllers/quizController.js";

import auth from "../middleware/auth.js";
import teacher from "../middleware/teacher.js";

const router = express.Router();

// STUDENT Routes
router.get("/quiz/:lessonId", getQuiz);
router.post("/quiz/submit", submitQuiz);
router.get("/quiz/:lessonId", auth, getQuizByLessonId);


// TEACHER Routes
router.post("/teacher/add-quiz", auth, teacher, addOrUpdateQuiz);

// LIST ALL QUIZZES
router.get("/teacher/quizzes", auth, teacher, getAllQuizzes);
router.put("/teacher/edit-quiz/:lessonId", auth, teacher, addOrUpdateQuiz);
router.delete("/teacher/delete-quiz/:id", auth, teacher, deleteQuiz);

export default router;
