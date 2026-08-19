import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import demoRoutes from "./routes/demoRoutes.js";

// Connect DB initially
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

import mongoose from "mongoose";

// Ensure database connection middleware for serverless requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "LinguaHub API is running" });
});

app.get("/api", (req, res) => {
  res.status(200).json({ status: "ok", message: "LinguaHub API is running" });
});

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    const dbState = states[mongoose.connection.readyState] || "unknown";
    res.status(200).json({
      status: "ok",
      database: dbState,
      hasMongoUri: Boolean(process.env.MONGODB_URI || process.env.DB_URL),
      hasJwtSecret: Boolean(process.env.JWT_SECRET),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      database: "error",
      message: err.message,
    });
  }
});

// API routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", lessonRoutes);
app.use("/api", quizRoutes);
app.use("/api", teacherRoutes);
app.use("/api", onboardingRoutes);
app.use("/api", progressRoutes);
app.use("/api", demoRoutes);

// Start server locally if not in Vercel Serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

