import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { motion } from "framer-motion";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setForm({
          name: res.data.name || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          country: res.data.country || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const updateField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api.put("/user/update", form);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-textSecondary mt-10">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-8 text-textPrimary"
    >
      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-extrabold text-headerHighlight drop-shadow-glow">
          Edit Profile
        </h1>
        <p className="text-xs text-textSecondary mt-1">
          Update your personal details
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-panel p-6 rounded-2xl border border-accent2/20 shadow-xl space-y-6">

        <form onSubmit={handleSave} className="space-y-5">

          <Input label="Name" name="name" value={form.name} onChange={updateField} />
          <Input label="Age" type="number" name="age" value={form.age} onChange={updateField} />

          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={updateField}
            options={[
              ["", "Select gender"],
              ["female", "Female"],
              ["male", "Male"],
              ["prefer-not", "Prefer not to say"],
            ]}
          />

          <Input label="Country" name="country" value={form.country} onChange={updateField} />

          <hr className="border-0 h-[2px] w-full bg-gradient-to-r from-transparent via-accent3 to-transparent rounded-full" />


          {/* SAVE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-bg text-textPrimary py-3 border border-b-2 rounded-xl font-bold shadow-glow"
            type="submit"
          >
            Save Changes ✔
          </motion.button>
        </form>

        {/* CANCEL */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full bg-bg text-textPrimary py-3 border border-b-2 rounded-xl font-bold shadow-glow"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

/* REUSABLE COMPONENTS */

function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-textSecondary font-semibold">{label}</p>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
                   text-textPrimary focus:ring-2 focus:ring-accent2/40 outline-none
                   transition-all"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-textSecondary font-semibold">{label}</p>
      <select
        {...props}
        className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
                   text-textPrimary focus:ring-2 focus:ring-accent2/40 outline-none
                   transition-all"
      >
        {options.map(([val, text], i) => (
          <option key={i} value={val}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
