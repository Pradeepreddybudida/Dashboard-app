"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DataInputForm() {
  const [name, setName] = useState("");
  const [uv, setUv] = useState("");
  const [pv, setPv] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !uv || !pv) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("metrics").insert([
      { name, uv: parseInt(uv), pv: parseInt(pv), created_at: new Date() },
    ]);

    if (error) {
      alert("Error inserting data: " + error.message);
      console.error("Error inserting data:", error);
    } else {
      alert("Metric added successfully!");
      setName("");
      setUv("");
      setPv("");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className={`form-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h2 className="form-title">Add New Metric</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Metric Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter metric name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="uv">UV (Unique Visitors)</label>
          <input
            type="number"
            id="uv"
            value={uv}
            onChange={(e) => setUv(e.target.value)}
            placeholder="Enter UV"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pv">PV (Page Views)</label>
          <input
            type="number"
            id="pv"
            value={pv}
            onChange={(e) => setPv(e.target.value)}
            placeholder="Enter PV"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <button className="toggle-mode-btn" onClick={toggleDarkMode}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      <style jsx>{`
        :root {
          --color-background-light: #f9fafb;
          --color-text-light: #1f2937;
          --color-background-dark: #2d3748;
          --color-text-dark: #e2e8f0;
          --color-border-light: #e5e7eb;
          --color-border-dark: #4a5568;
          --color-btn: #3182ce;
          --color-btn-hover: #2b6cb0;
          --color-border-focus: #63b3ed;
        }

        .form-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid var(--color-border-light);
          border-radius: 8px;
          background-color: var(--color-background-light);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .dark-mode .form-container {
          background-color: var(--color-background-dark);
          border-color: var(--color-border-dark);
        }

        .form-title {
          text-align: center;
          margin-bottom: 24px;
          color: var(--color-text-light);
          font-size: 24px;
        }

        .dark-mode .form-title {
          color: var(--color-text-dark);
        }

        .form-group {
          margin-bottom: 16px;
        }

        label {
          display: block;
          font-size: 16px;
          margin-bottom: 6px;
          color: var(--color-text-light);
        }

        .dark-mode label {
          color: var(--color-text-dark);
        }

        input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid var(--color-border-light);
          border-radius: 6px;
          background-color: #fff;
          transition: all 0.3s ease;
        }

        .dark-mode input {
          background-color: #4a5568;
          color: var(--color-text-dark);
          border-color: var(--color-border-dark);
        }

        input:focus {
          border-color: var(--color-border-focus);
          outline: none;
          box-shadow: 0 0 4px rgba(49, 130, 206, 0.4);
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: var(--color-btn);
          color: #ffffff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: var(--color-btn-hover);
        }

        .submit-btn:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }

        .toggle-mode-btn {
          width: 100%;
          padding: 12px;
          margin-top: 20px;
          background-color: var(--color-btn);
          color: #ffffff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .dark-mode .toggle-mode-btn {
          background-color: var(--color-btn-hover);
        }

        @media (max-width: 600px) {
          .form-container {
            max-width: 90%;
            padding: 15px;
          }

          .form-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
