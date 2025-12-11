import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/register", form);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
      }

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => navigate("/onboarding"), 1200);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Floating Glow Orbs */}
      <motion.div
        className="absolute top-10 left-10 text-3xl opacity-20 pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 8, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-3xl opacity-20 pointer-events-none"
        animate={{ y: [0, 10, 0], rotate: [0, -8, 8, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        🌟
      </motion.div>

      {/* Soft neon background blur */}
      <div className="absolute inset-0 bg-gradient-main opacity-20 blur-[130px]" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md bg-panel rounded-3xl p-8 
                   shadow-[0_0_30px_rgba(0,198,255,0.25)]
                   border border-accent1/20 backdrop-blur-xl"
      >
        {/* Mascot */}
        {/* <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-5xl absolute right-6 top-6 drop-shadow-glow"
        >
          🐤
        </motion.div> */}

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-2 text-headerHighlight drop-shadow-glow">
          Join Linguahub 🎉
        </h2>
        <p className="text-xs text-textSecondary mb-5">
          Learn languages with streaks, XP and fun challenges!
        </p>

        {/* Alerts */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm text-red-400 bg-red-500/10 
                       border border-red-500/40 rounded-xl px-3 py-2"
          >
            {error}
          </motion.p>
        )}

        {success && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm text-accent3/80 bg-accent3/10 
                       border border-accent3/30 rounded-xl px-3 py-2"
          >
            {success}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
            <label className="text-sm font-semibold text-textSecondary">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
                         focus:ring-2 focus:ring-accent2/60 focus:outline-none 
                         text-textPrimary transition"
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}>
            <label className="text-sm font-semibold text-textSecondary">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
                         focus:ring-2 focus:ring-accent2/60 focus:outline-none 
                         text-textPrimary transition"
              required
            />
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
            <label className="text-sm font-semibold text-textSecondary">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent1/20 
                         focus:ring-2 focus:ring-accent1/60 focus:outline-none 
                         text-textPrimary transition"
              required
            />
          </motion.div>

          {/* Role */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }}>
            <label className="text-sm font-semibold text-textSecondary">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent1/20 
                         focus:ring-2 focus:ring-accent1/60 text-sm text-textPrimary transition"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </motion.div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-gradient-main text-textPrimary font-semibold py-3 rounded-xl 
                       shadow-lg shadow-accent2/20 mt-3 transition"
          >
            Sign up 🚀
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-xs text-center text-textSecondary">
          Already have an account?{" "}
          <Link className="text-accent2 font-semibold hover:underline" to="/login">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
