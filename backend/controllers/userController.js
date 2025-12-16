import User from '../models/user.js'
import {updateStreak} from "./quizController.js"

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp,
      streak: user.streak,
      accuracy: user.accuracy,
      totalQuestions: user.totalQuestions,
      correctAnswers: user.correctAnswers,
      lessonsCompleted: user.progress.completedLessons.length,
      quizzesCompleted: user.progress.completedQuizzes.length,
      onboarding: user.onboarding,
      age: user.age || null,
      gender: user.gender || "",
      country: user.country || ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body; // contains age, gender, country, etc.

    const allowedFields = [
      "name",
      "age",
      "gender",
      "country"
    ];

    const filtered = {};

    for (let key of allowedFields) {
      if (updates[key] !== undefined) filtered[key] = updates[key];
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: filtered },
      { new: true }
    );

    res.json({
      msg: "Profile updated successfully",
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to update profile" });
  }
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

    updateStreak(user);
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