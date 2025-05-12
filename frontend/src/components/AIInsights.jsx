import React, { useState } from "react";
import axios from "axios";

const AIInsights = ({ data, onClose }) => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetInsights = async () => {
    setLoading(true);
    try {
      // Prepare a prompt with a sample of your data
      const sample = JSON.stringify(data.slice(0, 10));
      const prompt = `Analyze this data and provide key insights:\n${sample}`;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setInsights(response.data.choices[0].message.content);
    } catch (err) {
      setInsights("Sorry, could not fetch insights.");
    }
    setLoading(false);
  };

  return (
    <div className="ai-insights-modal">
      <div className="ai-insights-content">
        <button className="ai-insights-close" onClick={onClose}>×</button>
        <h3>AI Insights</h3>
        <button
          className="ai-insights-btn"
          onClick={handleGetInsights}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>
        <div className="ai-insights-result" style={{ whiteSpace: "pre-line", marginTop: 16 }}>
          {insights}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
