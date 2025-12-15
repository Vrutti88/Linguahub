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
