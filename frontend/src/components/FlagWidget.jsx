import { motion } from "framer-motion";

export const LANGUAGES = [
    { name: "Spanish", flag: "https://flagcdn.com/w80/es.png" },
    { name: "French", flag: "https://flagcdn.com/w80/fr.png" },
    { name: "Japanese", flag: "https://flagcdn.com/w80/jp.png" },
    { name: "German", flag: "https://flagcdn.com/w80/de.png" },
    { name: "Korean", flag: "https://flagcdn.com/w80/kr.png" },
    { name: "Italian", flag: "https://flagcdn.com/w80/it.png" },
    { name: "Chinese", flag: "https://flagcdn.com/w80/cn.png" },
    { name: "Hindi", flag: "https://flagcdn.com/w80/in.png" },
    { name: "Russian", flag: "https://flagcdn.com/w80/ru.png" },
    { name: "Arabic", flag: "https://flagcdn.com/w80/sa.png" },
    { name: "Portuguese", flag: "https://flagcdn.com/w80/br.png" },
    { name: "English", flag: "https://flagcdn.com/w80/us.png" },
  ];
  

  export default function FlagWidget({ language }) {
    if (!language) return null;
  
    // Find flag by language name
    const selected = LANGUAGES.find(l => l.name === language);
  
    if (!selected) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.img
          src={selected.flag}
          alt={selected.name}
          className="w-9 h-7 rounded-md object-cover shadow-glow border border-accent2/40"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
    );
  }
