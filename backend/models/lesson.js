import mongoose from "mongoose";

const LessonItemSchema = new mongoose.Schema({
  src: { type: String, required: true },                // main word or sentence
  target: { type: String, required: true },             // translation
  pronunciation: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  audioUrl: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  tags: { type: [String], default: [] }
});

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Old field STILL supported (optional)
    content: {
      type: String,
      default: "",
    },

    // NEW main learning content array
    contents: {
      type: [LessonItemSchema],
      default: [],
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    estimatedTime: {
      type: String,
      default: "",
    },    

    image: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      default: null,
    },

    language: { 
      type: String, 
      required: true 
    },

    order: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Lesson", LessonSchema);
