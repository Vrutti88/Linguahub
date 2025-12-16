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

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", lessonRoutes);
app.use("/api", quizRoutes);
app.use("/api", teacherRoutes);
app.use("/api", onboardingRoutes);
app.use("/api", progressRoutes);
app.use("/api", demoRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

