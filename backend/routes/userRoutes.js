import express from "express";
import auth from "../middleware/auth.js";
import {
  getProfile,
  getStreak,
  updateProgress,
  getLeaderboard,
  updateProfile
} from "../controllers/userController.js";

const router = express.Router();

router.get("/user/profile", auth, getProfile);
router.put("/user/update", auth, updateProfile);
router.get("/user/streak", auth, getStreak);
router.put("/user/progress", auth, updateProgress);
router.get("/user/leaderboard", auth, getLeaderboard);

export default router;
