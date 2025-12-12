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
  
      const user = await User.findById(req.user._id);

    let xpGained = 0;

    // ⭐ Only add XP the FIRST time a lesson is completed
    if (!user.progress.completedLessons.includes(lessonId)) {
      user.progress.completedLessons.push(lessonId);

      // ⭐ Add XP
      user.lessonXp.set(lessonId, 20);
      xpGained = 20;
    }

    await user.save();
  
    res.json({
      msg: "Lesson progress updated",
      xpGained,
      totalXp: user.lessonXp,
      completedLessons: user.progress.completedLessons
    });
  
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
  