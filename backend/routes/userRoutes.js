import express from "express";
import auth from "../middleware/auth.js";
import {
  getProfile,
  getStreak,
  updateProgress,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/user/profile", auth, getProfile);
router.get("/user/streak", auth, getStreak);
router.put("/user/progress", auth, updateProgress);

export default router;
