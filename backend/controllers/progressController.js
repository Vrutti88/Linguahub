// ⭐ MARK LESSON COMPLETED → stored inside User.progress.completedLessons
export const markLessonComplete = async (req, res) => {
  try {
    const user = req.user;
    const { lessonId } = req.body;

    if (!lessonId) {
      return res.status(400).json({ msg: "lessonId is required" });
    }

    // Only add if not already completed
    if (!user.progress.completedLessons.map(id => id.toString()).includes(lessonId)) {
      user.progress.completedLessons.push(lessonId);
      await user.save();
    }

    res.json({
      msg: "Lesson marked as completed!",
      completedLessons: user.progress.completedLessons
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to save progress" });
  }
};

// ⭐ GET COMPLETION STATUS OF A LESSON → read from User.progress.completedLessons
export const getLessonProgress = async (req, res) => {
  try {
    const user = req.user;
    const lessonId = req.params.lessonId;

    const completed = user.progress.completedLessons
      .map(id => id.toString())
      .includes(lessonId);

    res.json({ completed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch progress" });
  }
};
