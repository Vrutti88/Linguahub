import { motion } from "framer-motion";
import Lottie from "lottie-react";
import BlueBird from "../assets/Blue-Bird.json"; // your downloaded file


export default function WelcomeScreen({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-bg/80 backdrop-blur-xl flex flex-col 
                 items-center justify-center z-[9999]"
    >

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-44 h-44 flex items-center justify-center"
      >
        <Lottie animationData={BlueBird} loop={true} />
      </motion.div>


      {/* Welcome Text */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl font-extrabold text-headerHighlight mt-4 drop-shadow-glow"
      >
        Hello, {name}! 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-sm text-textSecondary mt-2"
      >
        Welcome to Linguahub — let's start your learning journey!
      </motion.p>
    </motion.div>
  );
}
