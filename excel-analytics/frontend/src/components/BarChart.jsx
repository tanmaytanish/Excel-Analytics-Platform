import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Example: Count occurrences of a categorical field (e.g., "class")
  const field = "class"; // Change this to a relevant column in your data
  const counts = {};
  data.forEach((row) => {
    counts[row[field]] = (counts[row[field]] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: `Count by ${field}`,
        data: Object.values(counts),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Bar Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
