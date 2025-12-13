import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: { type: Number, default: null },
    gender: { type: String, default: "" },
    country: { type: String, default: "" },
  role: { type: String, default: "student" },
  xp: { type: Number, default: 0 },
  lessonXp: { type: Map, of: Number, default: {} },
  quizXp: { type: Map, of: Number, default: {} },
  accuracy: {
    type: Number,
    default: 0, // percentage
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  quizScores: {
    type: Map,
    of: Number,
    default: {}
  },  

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
  lastActiveDate: { type: String, default: null },

  progress: {
    completedLessons: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }
    ],
    completedQuizzes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" } // NEW
    ]
  },  
},
{timestamps:true}
);

UserSchema.pre("save", async function () {
  let total = 0;

  if (this.lessonXp) {
    for (let v of this.lessonXp.values()) total += v;
  }

  if (this.quizXp) {
    for (let v of this.quizXp.values()) total += v;
  }

  this.xp = total;
});

export default mongoose.model("User", UserSchema);
