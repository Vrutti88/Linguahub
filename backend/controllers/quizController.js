import Quiz from "../models/quiz.js";
import Lesson from "../models/lesson.js";
import User from "../models/user.js";

// 🟩 Get quiz for lesson
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lessonId: req.params.lessonId });

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load quiz" });
  }
};

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


// 🟧 STUDENT: Submit quiz (MCQ + Fill)
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
    //  XP LOGIC (Fair + Accurate)
    // ---------------------------

    let xpEarned = 0;

    if (percent >= 90) {
      xpEarned = 50; // high score
    } else if (percent >= 60) {
      xpEarned = 30; // pass bonus
    } else {
      xpEarned = 0; // fail → no XP
    }

    // ---------------------------------------
    // BLOCK XP IF USER ALREADY COMPLETED QUIZ
    // ---------------------------------------
    const alreadyDone = user.progress.completedLessons.includes(lessonId);

    if (alreadyDone) {
      xpEarned = 0; // 🚫 prevent XP farming
    } else {
      // first time → award XP + mark lesson complete
      user.progress.completedLessons.push(lessonId);
      user.xp += xpEarned;
      await user.save();
    }

    // ─────────────── STREAK LOGIC ───────────────
const today = new Date().toDateString();
const last = user.lastActiveDate;

if (!last) {
  user.streak = 1;
} else if (last === today) {
  // already counted today
} else {
  const lastDate = new Date(last);
  const todayDate = new Date(today);

  // If lastActiveDate is in the FUTURE → reset
  if (lastDate > todayDate) {
    user.streak = 1;
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStr = yesterday.toDateString();

    if (last === yesterdayStr) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
  }
}

user.lastActiveDate = today;
await user.save();

    // ─────────────────────────────────────────────


    return res.json({
      score,
      total: quiz.questions.length,
      percent,
      xpEarned,
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

// 🟨 Teacher: Create or Update Quiz
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

// 🟦 Teacher: Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("lessonId", "title")
      .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load quiz list" });
  }
};

// 🟥 Teacher: Delete quiz
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
