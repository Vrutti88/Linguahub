import User from "../models/user.js";

export const saveOnboarding = async (req, res) => {
  try {
    const { language, reason, knowledge, dailyGoal } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        onboardingCompleted: true,
        onboarding: { language, reason, knowledge, dailyGoal:Number(dailyGoal) },
    },
    { new: true }    //updates the user data
);

    res.json({
      msg: "Onboarding completed",
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};