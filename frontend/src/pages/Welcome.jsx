// src/pages/Welcome.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import BlueBird from "../assets/Blue-Bird.json";

export default function Welcome() {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");

    const fullText = `Hello, ${name}! 👋`;
    const [displayed, setDisplayed] = useState("");

    const lottieRef = useRef();

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.5); // ⬅️ Slow down to 50%
        }
    }, []);

    // TYPEWRITER EFFECT
    useEffect(() => {
        let index = 0;
        const speed = 70;

        const interval = setInterval(() => {
            setDisplayed(fullText.slice(0, index));
            index++;

            if (index > fullText.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full bg-bg flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-main blur-[160px] opacity-20" />

            {/* 🐤 MASCOT WITH WAVE ANIMATION */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col items-center"
            >

                {/* Waving Bird */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-44 h-44 flex items-center justify-center"
                >
                    <Lottie animationData={BlueBird} loop={true} lottieRef={lottieRef} />
                </motion.div>

                {/* Speech Bubble */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: [4, -10, 4], x: -24 }}
                    transition={{ delay: 0.2, duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatType:"mirror"}}
                    className="absolute top-0 -right-24 bg-bg text-textPrimary px-5 py-2 border border-b-2 rounded-3xl text-xs font-semibold shadow-lg"
                >
                    Hi there!
                    <div
                        className="absolute -bottom-1.5 left-4 w-2.5 h-2.5 bg-bg border-r-2 border-b rotate-45"
                    ></div>
                </motion.div>
            </motion.div>

            {/* TYPEWRITER TITLE */}
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl font-extrabold text-headerHighlight drop-shadow-glow text-center mt-6 flex"
            >
                {displayed}

                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                >
                    |
                </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="text-sm text-textSecondary mt-3 text-center"
            >
                Welcome to Linguahub — let’s start your language journey!
            </motion.p>

            {/* Get Started Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                onClick={() => navigate("/onboarding")}
                className="mt-8 px-6 py-3 rounded-xl bg-bg
                   text-textPrimary font-bold border border-b-2 shadow-glow text-sm hover:scale-105 
                   transition z-50"
            >
                Get Started 🚀
            </motion.button>

        </div>
    );
}
