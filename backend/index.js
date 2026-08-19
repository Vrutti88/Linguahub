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

// Ensure database connection middleware for serverless requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "LinguaHub API is running" });
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

