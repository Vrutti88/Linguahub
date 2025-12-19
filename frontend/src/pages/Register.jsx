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
    age: "",
    gender: "",
    country: "",
    nativeLanguage: "",
    learningGoal: "",
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
      setTimeout(() => {
        if (res.data.user.role === "student") {
          navigate("/welcome");  // Student - welcom page
        } else {
          navigate("/Dashboard");        // Teacher - dashboard
        }
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-main opacity-20 blur-[130px]" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-2xl bg-panel rounded-3xl p-10 
                   shadow-[0_0_30px_rgba(0,198,255,0.25)]
                   border border-accent1/20 backdrop-blur-xl"
      >
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
            className="mb-3 text-sm text-red-400 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2"
          >
            {error}
          </motion.p>
        )}

        {success && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm text-textPrimary bg-accent3/10 border border-accent3/30 rounded-xl px-3 py-2"
          >
            {success}
          </motion.p>
        )}

        {/* FORM STARTS */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <InputField delay={0.1} label="Name" name="name" value={form.name} onChange={handleChange} required />

          <InputField delay={0.15} label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <InputField delay={0.2} label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />

          <InputField delay={0.25} label="Age" name="age" type="number" value={form.age} onChange={handleChange} required />

          <SelectField
            delay={0.3}
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            options={[
              ["", "Select gender"],
              ["female", "Female"],
              ["male", "Male"],
              ["prefer-not", "Prefer not to say"],
            ]}
          />

          <InputField delay={0.35} label="Country" name="country" value={form.country} onChange={handleChange} required />

          {/* ROLE Field — Full width */}
          <div className="col-span-1 sm:col-span-2">
            <SelectField
              delay={0.5}
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              options={[
                ["student", "Student"],
                ["teacher", "Teacher"],
              ]}
            />
          </div>

          {/* SUBMIT BUTTON — Full width */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="col-span-1 sm:col-span-2 w-full bg-gradient-main text-textPrimary font-semibold py-3 rounded-xl shadow-lg shadow-accent2/20 mt-2 transition"
          >
            Sign up 🚀
          </motion.button>

        </form>

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

/* Reusable Components */
function InputField({ delay, label, ...props }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay } }}>
      <label className="text-sm font-semibold text-textSecondary">{label}</label>
      <input
        {...props}
        className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
                   focus:ring-2 focus:ring-accent2/60 text-sm text-textPrimary transition"
      />
    </motion.div>
  );
}

function SelectField({ delay, label, options, ...props }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay } }}>
      <label className="text-sm font-semibold text-textSecondary">{label}</label>
      <select
        {...props}
        className="mt-1 w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
                   focus:ring-2 focus:ring-accent2/60 text-sm text-textPrimary transition"
      >
        {options.map(([value, label], i) => (
          <option key={i} value={value}>{label}</option>
        ))}
      </select>
    </motion.div>
  );
}
