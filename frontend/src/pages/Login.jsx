import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">

      {/* Animated Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-main blur-[140px]"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md bg-panel rounded-3xl shadow-2xl 
                   p-8 border border-accent1/20 backdrop-blur-xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-12 h-12 rounded-2xl bg-gradient-main flex items-center justify-center 
                       text-2xl font-extrabold text-textPrimary shadow-glow"
          >
            <img src={Logo} alt="" />
          </motion.div>

          <div>
            <h1 className="font-extrabold text-2xl text-headerHighlight drop-shadow-glow">
              Linguahub
            </h1>
            <p className="text-xs text-textSecondary">
              Gamified language learning platform
            </p>
          </div>
        </motion.div>

        {/* Welcome */}
        <h2 className="text-xl font-bold mb-4 text-textPrimary">
          Welcome back 👋
        </h2>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm text-red-400 bg-red-500/10 
                       border border-red-500/40 rounded-xl px-3 py-2"
          >
            {error}
          </motion.p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-textSecondary">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent2/30 
                         text-textPrimary focus:outline-none focus:ring-2 
                         focus:ring-accent2/60 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-textSecondary">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent1/30 
                         text-textPrimary focus:outline-none focus:ring-2 
                         focus:ring-accent1/60 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-gradient-main text-textPrimary font-semibold 
                       py-3 rounded-xl shadow-glow mt-2"
          >
            Log in
          </motion.button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-xs text-center text-textSecondary">
          New to Linguahub?{" "}
          <Link to="/register" className="text-accent2 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
