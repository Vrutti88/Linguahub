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

      {/* Soft Gradient Behind Page */}
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
