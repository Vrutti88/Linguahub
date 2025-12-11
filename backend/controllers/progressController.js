import Progress from "../models/progress.js";

// ⭐ MARK LESSON COMPLETED
export const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const userId = req.user.id;

    if (!lessonId) {
      return res.status(400).json({ msg: "lessonId is required" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, lessonId },
      { completed: true, completedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({
      msg: "Lesson completed!",
      progress,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to save progress" });
  }
};

// ⭐ GET COMPLETION STATUS OF A LESSON
export const getLessonProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const lessonId = req.params.lessonId;

    const progress = await Progress.findOne({ userId, lessonId });

    res.json({
      completed: progress?.completed || false,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch progress" });
  }
};
