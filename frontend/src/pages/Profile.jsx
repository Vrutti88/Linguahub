import { useEffect, useState } from "react";
import api from "../api/client.js";
import StreakWidget from "../components/StreakWidget.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  if (!profile) {
    return <p className="text-textSecondary">Loading profile...</p>;
  }

  return (
    <div className="space-y-8 text-textPrimary p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 2 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow flex items-center gap-2">
              👤 Profile
            </h1>
            <p className="text-xs text-textSecondary">
              Your progress and learning stats.
            </p>
          </motion.div>
        </div>
        <div>
          <motion.button
            onClick={() => navigate("/profile/edit")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-xs rounded-xl bg-bg border border-b-2  text-textPrimary shadow-glow"
          >
            Edit Profile ✏️
          </motion.button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-panel rounded-2xl p-6 border border-accent2/20 shadow-xl space-y-6">

        {/* TOP ROW */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, -4, 4, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-16 h-16 bg-gradient-main rounded-2xl flex items-center justify-center text-3xl shadow-glow"
          >
            🌐
          </motion.div>

          <div>
            <p className="font-semibold text-lg">{profile.name}</p>
            <p className="text-xs text-textSecondary">{profile.email}</p>
            <p className="text-xs text-textSecondary capitalize">{profile.role}</p>
          </div>
        </div>

        {/* STREAK */}
        <StreakWidget streak={profile.streak} />

        {/* QUICK STATS */}
        {profile.role === "student" && (
          <div>
            <h2 className="text-sm font-semibold text-headerHighlight mb-3">
              Quick Stats
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="XP" value={profile.xp} />
              <Stat label="Lessons" value={profile.lessonsCompleted} />
              <Stat label="Quizzes" value={profile.quizzesCompleted} />
              <Stat label="Accuracy" value={`${profile.accuracy}%`} />
            </div>
          </div>
        )}
      </div>

      {/* PERSONAL INFO CARD */}
      <div className="bg-panel rounded-2xl p-6 border border-accent2/20 shadow-xl space-y-4">

        <h2 className="text-sm font-semibold text-headerHighlight mb-2">
          Personal Info
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Age" value={profile.age} />
          <Info label="Gender" value={profile.gender} />
          <Info label="Country" value={profile.country} />
          {profile.role === "student" && (
          <Info label="Daily Goal" value={`${profile?.onboarding?.dailyGoal || 0} min`} />
          )}
          {/* <Info label="Native Language" value={profile.nativeLanguage || "—"} /> */}
          {/* <Info label="Learning Goal" value={profile.learningGoal || "—"} /> */}
        </div>
      </div>

    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-bg rounded-xl p-3 border border-b-2 border-accent2/20 text-center">
      <p className="text-xs text-textSecondary">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-bg rounded-xl p-3 border border-b-2 border-accent2/20">
      <p className="text-[11px] text-textSecondary">{label}</p>
      <p className="text-sm font-semibold">{value || "Not set"}</p>
    </div>
  );
}
