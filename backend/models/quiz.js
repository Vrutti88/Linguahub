// models/quiz.js
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["mcq", "fib"],
    default: "mcq",
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  // MCQ options (used only when type === "mcq")
  options: {
    type: [String],
    default: [],
  },

  // MCQ correct answer index
  answer: {
    type: Number,
    default: 0,
  },

  // Fill-in-the-blank correct answer
  answerText: {
    type: String,
    default: "",
  },
});

const QuizSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", QuizSchema);
