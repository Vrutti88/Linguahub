import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { motion, AnimatePresence } from "framer-motion";

// 🌍 Language List (unchanged)
const LANGUAGES = [
  { name: "Spanish", flag: "https://flagcdn.com/w80/es.png", learners: "48.8M" },
  { name: "French", flag: "https://flagcdn.com/w80/fr.png", learners: "27.2M" },
  { name: "Japanese", flag: "https://flagcdn.com/w80/jp.png", learners: "24.4M" },
  { name: "German", flag: "https://flagcdn.com/w80/de.png", learners: "18.9M" },
  { name: "Korean", flag: "https://flagcdn.com/w80/kr.png", learners: "17.8M" },
  { name: "Italian", flag: "https://flagcdn.com/w80/it.png", learners: "13.4M" },
  { name: "Chinese", flag: "https://flagcdn.com/w80/cn.png", learners: "11.8M" },
  { name: "Hindi", flag: "https://flagcdn.com/w80/in.png", learners: "11.7M" },
  { name: "Russian", flag: "https://flagcdn.com/w80/ru.png", learners: "9.81M" },
  { name: "Arabic", flag: "https://flagcdn.com/w80/sa.png", learners: "8.46M" },
  { name: "Portuguese", flag: "https://flagcdn.com/w80/br.png", learners: "6.12M" },
  { name: "English", flag: "https://flagcdn.com/w80/us.png", learners: "21.9M" },
];

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    language: "",
    reason: "",
    knowledge: "",
    dailyGoal: "",
  });

  const steps = [
    "Choose Language",
    "Why Are You Learning?",
    "How Much You Know?",
    "Daily Goal",
  ];

  const progress = ((step + 1) / steps.length) * 100;
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const finish = async (finalData = form) => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/onboarding/save", finalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/main");
    } catch (error) {
      console.error("Onboarding save failed:", error);
      alert("Failed to save onboarding");
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg p-6 flex justify-center items-center relative overflow-hidden">

      {/* ⭐ ANIMATED FLOATING PARTICLES */}
      {/* <motion.div
        className="absolute top-10 left-10 text-4xl opacity-25 pointer-events-none"
        animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        ✨
      </motion.div> */}

      {/* <motion.div
        className="absolute bottom-10 right-12 text-5xl opacity-20 pointer-events-none"
        animate={{ y: [0, 14, 0], rotate: [0, -6, 6, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        🌟
      </motion.div> */}

      {/* ⭐ FLOATING MASCOT */}
      {/* <motion.div
        className="absolute top-6 right-1/2 translate-x-1/2 text-5xl"
        animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🐤
      </motion.div> */}

      {/* ⭐ BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-main opacity-20 blur-[140px]"></div>

      {/* ⭐ MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-xl bg-panel rounded-3xl
                   border border-accent2/30 shadow-[0_0_40px_rgba(0,198,255,0.25)]
                   p-8 backdrop-blur-xl text-textPrimary"
      >
        {/* PROGRESS BAR */}
        <div>
          <div className="w-full bg-bg h-3 rounded-full overflow-hidden border border-accent2/40">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
              className="h-full bg-gradient-main"
            />
          </div>

          <motion.p
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-xs text-textSecondary mt-3 text-center tracking-wide"
          >
            Step {step + 1} of {steps.length}
          </motion.p>
        </div>

        {/* HEADER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="mt-6 text-center"
          >
            <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow mb-2">
              {steps[step]}
            </h1>

            <p className="text-sm text-textSecondary">
              {step === 0 && "Choose your target language to begin your journey."}
              {step === 1 && "Tell us why you're learning this language!"}
              {step === 2 && "We’ll tailor lessons based on your level."}
              {step === 3 && "Pick a daily goal that suits your schedule."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CONTENT */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step + "-content"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4"
            >

              {/* STEP 1: LANGUAGE */}
              {step === 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {LANGUAGES.map((lang) => (
                    <motion.button
                      whileHover={{ scale: 1.08, rotate: 1 }}
                      whileTap={{ scale: 0.92 }}
                      key={lang.name}
                      onClick={() => {
                        setForm({ ...form, language: lang.name });
                        next();
                      }}
                      className="p-5 rounded-3xl bg-panel border border-accent2/20 
                                 shadow-md flex flex-col items-center 
                                 hover:shadow-glow transition-all"
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-14 h-10 rounded-xl shadow"
                      />
                      <span className="text-xs font-semibold mt-2">{lang.name}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* STEP 2: REASON */}
              {step === 1 && (
                <div className="flex flex-col gap-3">
                  {[
                    "Travel",
                    "Work or Career",
                    "Studies",
                    "Friends & Family",
                    "Just for fun",
                    "Other",
                  ].map((reason) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      key={reason}
                      onClick={() => { setForm({ ...form, reason }); next(); }}
                      className="p-4 rounded-xl bg-panel border border-accent2/20 
                                 text-left shadow hover:shadow-glow"
                    >
                      {reason}
                    </motion.button>
                  ))}

                  <button onClick={back} className="text-sm text-accent2 underline">
                    Back
                  </button>
                </div>
              )}

              {/* STEP 3: KNOWLEDGE */}
              {step === 2 && (
                <div className="flex flex-col gap-3">
                  {[
                    "Complete Beginner",
                    "Know some basics",
                    "Can hold simple conversations",
                    "Intermediate or above",
                  ].map((level) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      key={level}
                      onClick={() => { setForm({ ...form, knowledge: level }); next(); }}
                      className="p-4 rounded-xl bg-panel border border-accent2/20 
                                 text-left shadow hover:shadow-glow"
                    >
                      {level}
                    </motion.button>
                  ))}

                  <button onClick={back} className="text-sm text-accent2 underline">
                    Back
                  </button>
                </div>
              )}

              {/* STEP 4: DAILY GOAL */}
              {step === 3 && (
                <div className="flex flex-col gap-3">
                  {[5, 10, 15, 30].map((min) => (
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      whileHover={{ scale: 1.05 }}
                      key={min}
                      onClick={() => {
                        const updated = { ...form, dailyGoal: min };
                        finish(updated);
                      }}
                      className="p-4 rounded-xl bg-panel border border-accent2/20 
                                 text-left shadow hover:shadow-glow font-semibold"
                    >
                      {min} minutes
                    </motion.button>
                  ))}

                  <button onClick={back} className="text-sm text-accent2 underline">
                    Back
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
