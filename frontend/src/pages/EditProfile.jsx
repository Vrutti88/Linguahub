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
    nativeLanguage: "",
    learningGoal: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setForm(res.data);
      } catch (err) {
        console.error(err);
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

  return (
    <div className="space-y-6 max-w-xl">

      <h1 className="text-3xl font-bold text-headerHighlight drop-shadow-glow">
        Edit Profile
      </h1>

      <form onSubmit={handleSave} className="space-y-4">

        <Input label="Name" name="name" value={form.name} onChange={updateField} />
        <Input label="Age" type="number" name="age" value={form.age} onChange={updateField} />

        <Select
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={updateField}
          options={[
            ["", "Select"],
            ["female", "Female"],
            ["male", "Male"],
            ["prefer-not", "Prefer not to say"],
          ]}
        />

        <Input label="Country" name="country" value={form.country} onChange={updateField} />
        <Input label="Native Language" name="nativeLanguage" value={form.nativeLanguage} onChange={updateField} />

        <Select
          label="Learning Goal"
          name="learningGoal"
          value={form.learningGoal}
          onChange={updateField}
          options={[
            ["", "Choose goal"],
            ["travel", "Travel"],
            ["career", "Career growth"],
            ["study", "Study abroad"],
            ["fun", "Just for fun"],
          ]}
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          className="w-full bg-gradient-main text-textPrimary py-3 rounded-xl font-semibold shadow-glow"
          type="submit"
        >
          Save Changes
        </motion.button>
      </form>

      <button
        onClick={() => navigate("/profile")}
        className="text-sm text-accent2 underline mt-3"
      >
        Cancel
      </button>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <p className="text-xs text-textSecondary mb-1">{label}</p>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
          text-textPrimary focus:ring-2 focus:ring-accent2/40 outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <p className="text-xs text-textSecondary mb-1">{label}</p>
      <select
        {...props}
        className="w-full px-3 py-2 rounded-xl bg-bg border border-accent2/20 
          text-textPrimary focus:ring-2 focus:ring-accent2/40 outline-none"
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
