import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
  xp: { type: Number, default: 0 },

  // 🔥 Duolingo-style onboarding fields
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },

  onboarding: {
    language: { type: String, default: "" },     // e.g. "Spanish"
    reason: { type: String, default: "" },       // travel, work, fun, etc
    knowledge: { type: String, default: "" },    // beginner, intermediate, etc
    dailyGoal: { type: String, default: 0 },     // minutes per day
  },

  // 🔥 Gamification fields you already had
  streak: { type: Number, default: 0 },

  progress: {
    completedLessons: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }
    ],
  },
});

export default mongoose.model("User", UserSchema);
