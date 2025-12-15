import Lesson from "../models/lesson.js";
import Quiz from "../models/quiz.js";

// Teacher creates lesson
export const addLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create({
      ...req.body,      // spread operator -> copies all fields from the req body
      createdBy: req.user.id,
    });

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create lesson" });
  }
};

export const addQuiz = async (req, res) => {
  try {
    const { lessonId, questions } = req.body;

    let quiz = await Quiz.findOne({ lessonId });

    if (!quiz) {
      quiz = await Quiz.create({ lessonId, questions });
    } else {
      quiz.questions = questions;
      await quiz.save();
    }

    await Lesson.findByIdAndUpdate(lessonId, { quizId: quiz._id });  //links quiz to a lesson

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: "Failed to save quiz" });
  }
};
