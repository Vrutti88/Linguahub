import { useState } from "react";
import api from "../api/client";

const DemoDataButton = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateDemoData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/demo/generate");

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate demo data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 text-textPrimary">
      <button
        onClick={generateDemoData}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: loading ? "#9E9E9E" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Generating Demo Data..." : "Generate Demo Data"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      {result && (
        <div className="mt-15 text-textPrimary">
          <h4>Demo Data Generated Successfully ✅</h4>
          <ul>
            <li><strong>Users:</strong> {result.counts.users}</li>
            <li><strong>Lessons:</strong> {result.counts.lessons}</li>
            <li><strong>Quizzes:</strong> {result.counts.quizzes}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DemoDataButton;
