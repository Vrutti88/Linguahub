import express from "express";
import auth from "../middleware/auth.js";
import { saveOnboarding } from "../controllers/onboardingController.js";

const router = express.Router();

router.post("/onboarding/save", auth, saveOnboarding);

export default router;
