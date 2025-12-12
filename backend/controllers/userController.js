import User from '../models/user.js'
// import Progress from "../models/progress.js";

export const getProfile = (req, res) => {
    res.json(req.user);
  };
  
  export const getStreak = (req, res) => {
    res.json({ streak: req.user.streak });
  };
  
  export const updateProgress = async (req, res) => {
    try {
      const { lessonId } = req.body;
  
      if (!lessonId) {
        return res.status(400).json({ msg: "lessonId is required" });
      }
  
      // Add lesson only once
      if (!req.user.progress.completedLessons.includes(lessonId)) {
        req.user.progress.completedLessons.push(lessonId);
        await req.user.save();
      }
  
      res.json({ msg: "Lesson progress updated" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to update progress" });
    }
  };
  
  
  export const getLeaderboard = async (req, res) => {
    try {
      const users = await User.find({ role: "student" });
  
      const leaderboard = users.map(u => ({
        name: u.name,
        xp: u.xp,
        streak: u.streak,
        accuracy: u.accuracy,
        quizzes: u.progress.completedQuizzes.length,
        lessons: u.progress.completedLessons.length
      }));
  
      leaderboard.sort((a, b) => b.xp - a.xp);
  
      res.json(leaderboard);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to load leaderboard" });
    }
  };
  