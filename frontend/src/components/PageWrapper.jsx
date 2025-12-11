import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="w-full h-full relative overflow-hidden"
    >
      {/* Floating Particle Left */}
      {/* <motion.div
        className="absolute top-6 left-6 text-lg opacity-30 pointer-events-none"
        animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨
      </motion.div> */}

      {/* Floating Particle Right */}
      {/* <motion.div
        className="absolute bottom-10 right-10 text-xl opacity-20 pointer-events-none"
        animate={{ x: [0, -6, 0], y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 3.4 }}
      >
        🌟
      </motion.div> */}

      {/* Soft Gradient Aura Behind Page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2 }}
        className="
          absolute inset-0 bg-gradient-to-br from-accent1/20 via-accent2/10 to-accent3/20 
          pointer-events-none blur-3xl
        "
      />

      {/* ACTUAL PAGE CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
