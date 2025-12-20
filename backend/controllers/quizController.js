import Quiz from "../models/quiz.js";
import Lesson from "../models/lesson.js";
import User from "../models/user.js";

export const getQuizByLessonId = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quiz = await Quiz.findOne({ lessonId });

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found for this lesson" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch quiz" });
  }
};


// STUDENT: Submit quiz (MCQ + Fill)
export const submitQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId, answers } = req.body;

    const quiz = await Quiz.findOne({ lessonId });
    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    // Load user
    const user = await User.findById(userId);

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];

      if (q.type === "mcq" && Number(userAnswer) === q.answer) score++;
      if (q.type === "fib") {
        if (
          String(userAnswer).trim().toLowerCase() ===
          String(q.answerText).trim().toLowerCase()
        ) {
          score++;
        }
      }
    });

    const percent = (score / quiz.questions.length) * 100;

    // ---------------------------
    // XP LOGIC
    // ---------------------------
    let xpEarned = 0;

    if (percent >= 90) xpEarned = 50;
    else if (percent >= 50) xpEarned = 30;
    else if (percent > 0) xpEarned = 10;
    else xpEarned = 0;

    // ⭐ Prevent XP decreasing — only store BEST xp
    const previousBestXp = user.quizXp.get(lessonId) || 0;

    let xpDifference = 0;

    if (xpEarned > previousBestXp) {
      xpDifference = xpEarned - previousBestXp;
      user.xp += xpDifference;

      // Only update best xp if improved
      user.quizXp.set(lessonId, xpEarned);
    }

    // ---------------------------
    // Quiz completion tracking
    // ---------------------------
    const alreadyDone = user.progress.completedQuizzes.some(
      (id) => id.toString() === lessonId
    );

    if (!alreadyDone) {
      user.progress.completedQuizzes.push(lessonId);
    }

    // ---------------------------
    // Accuracy Logic
    // ---------------------------
    user.correctAnswers = user.correctAnswers || 0;
    user.totalQuestions = user.totalQuestions || 0;
    user.quizScores = user.quizScores || new Map();

    const quizQuestionCount = quiz.questions.length;
    const previousScore = user.quizScores.get(lessonId) || 0;

    if (!user.quizScores.has(lessonId)) {
      user.totalQuestions += quizQuestionCount;
    }

    user.correctAnswers = user.correctAnswers - previousScore + score;

    user.quizScores.set(lessonId, score);

    user.accuracy = Math.round(
      (user.correctAnswers / user.totalQuestions) * 100
    );

    user.accuracy = Math.max(0, Math.min(user.accuracy, 100));

    updateStreak(user)
    await user.save();

    // ---------------------------
    // RESPONSE
    // ---------------------------
    return res.json({
      score,
      total: quiz.questions.length,
      percent,
      xpEarned,
      xpAdded: xpDifference,
      totalXP: user.xp,
      streak: user.streak,
      alreadyCompleted: alreadyDone,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Submission failed" });
  }
};

// Normalize questions before saving
const normalizeQuestions = (questions) =>
  questions.map((q) => ({
    type: q.type || "mcq",
    question: q.question,
    options: q.type === "mcq" ? q.options : [],
    answer: q.type === "mcq" ? Number(q.answer) : 0,
    answerText: q.type === "fib" ? q.answerText : "",
  }));

// Teacher: Create or Update Quiz
export const addOrUpdateQuiz = async (req, res) => {
  try {
    const { lessonId, questions } = req.body;

    const formatted = normalizeQuestions(questions);

    let quiz = await Quiz.findOne({ lessonId });

    if (quiz) {
      quiz.questions = formatted;
      await quiz.save();
    } else {
      quiz = await Quiz.create({ lessonId, questions: formatted });
    }

    // link to lesson
    await Lesson.findByIdAndUpdate(lessonId, { quizId: quiz._id });

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to save quiz" });
  }
};

// Teacher: Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    // Find lessons created by this teacher
    const lessons = await Lesson.find(
      { createdBy: req.user.id },
      "_id"
    );

    const lessonIds = lessons.map(l => l._id);

    // If teacher has no lessons, return empty list
    if (lessonIds.length === 0) {
      return res.json([]);
    }

    // Find quizzes linked to those lessons
    const quizzes = await Quiz.find({
      lessonId: { $in: lessonIds },
    })
      .populate("lessonId", "title")  // replaces lessonid with lesson data
      .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load quiz list" });
  }
};

// Teacher: Delete quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    await Lesson.findByIdAndUpdate(quiz.lessonId, { quizId: null });

    res.json({ msg: "Quiz deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete quiz" });
  }
};

export function updateStreak(user) {
  const today = new Date().toDateString();
  const last = user.lastActiveDate;

  // First activity ever
  if (!last) {
    user.streak = 1;
  } 
  // Already active today → do nothing
  else if (last === today) {
    return;
  } 
  else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    // If last activity was yesterday → streak++
    if (last === yesterdayStr) {
      user.streak += 1;
    } else {
      // Missed a day → reset streak
      user.streak = 1;
    }
  }

  // Update last active date
  user.lastActiveDate = today;
}