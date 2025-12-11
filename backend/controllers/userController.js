export const getProfile = (req, res) => {
    res.json(req.user);
  };
  
  export const getStreak = (req, res) => {
    res.json({ streak: req.user.streak });
  };
  
  export const updateProgress = async (req, res) => {
    const { lessonId } = req.body;
  
    if (!req.user.progress.completedLessons.includes(lessonId)) {
      req.user.progress.completedLessons.push(lessonId);
      req.user.streak += 1;
    }
  
    await req.user.save();
    res.json({ msg: "Progress updated" });
  };
  