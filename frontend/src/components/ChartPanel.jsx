import React, { useRef, useState, useMemo, useEffect } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import jsPDF from "jspdf";
import "./ChartPanel.css";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Canvas } from "@react-three/fiber";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function getNumericColumns(data) {
  if (!data || !data[0]) return [];
  return Object.keys(data[0]).filter(
    (key) => typeof data[0][key] === "number" || !isNaN(Number(data[0][key]))
  );
}

function getCategoricalColumns(data) {
  if (!data || !data[0]) return [];
  return Object.keys(data[0]).filter(
    (key) => isNaN(Number(data[0][key]))
  );
}

function Bar3D({ data, xKey, yKey }) {
  const groups = {};
  data.forEach((row) => {
    const xVal = row[xKey];
    const yVal = parseFloat(row[yKey]);
    if (!isNaN(yVal)) {
      groups[xVal] = (groups[xVal] || 0) + yVal;
    }
  });
  const keys = Object.keys(groups);
  if (!xKey || !yKey || keys.length === 0) {
    return <div style={{ color: "#aaa", textAlign: "center", marginTop: 40 }}>No valid numeric data for 3D Bar Chart.</div>;
  }
  return (
    <div style={{ height: 400, width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        {keys.map((key, i) => (
          <mesh key={key} position={[i * 2 - keys.length, groups[key] / 2, 0]}>
            <boxGeometry args={[1, groups[key], 1]} />
            <meshStandardMaterial color="#7e3af2" />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}

function Scatter3D({ data, xKey, yKey, zKey }) {
  const points = data
    .map((row) => ({
      x: Number(row[xKey]),
      y: Number(row[yKey]),
      z: Number(row[zKey]),
    }))
    .filter((pt) => !isNaN(pt.x) && !isNaN(pt.y) && !isNaN(pt.z));
  if (!xKey || !yKey || !zKey || points.length === 0) {
    return <div style={{ color: "#aaa", textAlign: "center", marginTop: 40 }}>No valid numeric data for 3D Scatter Plot.</div>;
  }
  return (
    <div style={{ height: 400, width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        {points.slice(0, 100).map((pt, idx) => (
          <mesh key={idx} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#7e3af2" opacity={0.8} transparent />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}

const chartLabels = {
  bar: "2D Bar Chart",
  line: "2D Line Chart",
  pie: "Pie Chart",
  scatter: "2D Scatter Plot",
  "3d-bar": "3D Bar Chart",
  "3d-scatter": "3D Scatter Plot",
};

const chartTypes = [
  "bar",
  "line",
  "pie",
  "scatter",
  "3d-bar",
  "3d-scatter",
];

const ChartPanel = ({ data, loading }) => {
  const numericCols = useMemo(() => getNumericColumns(data), [data]);
  const catCols = useMemo(() => getCategoricalColumns(data), [data]);

  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [zAxis, setZAxis] = useState("");
  const [showLegend, setShowLegend] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Single chart ref
  const singleChartRef = useRef();

  // Chart refs for "Show All" mode
  const chartRefs = useRef({});

  // Show toast after successful upload (when data changes and is non-empty)
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      toast.success("File uploaded successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (chartType === "pie") {
      setXAxis(catCols[0] || "");
      setYAxis(numericCols[0] || "");
      setZAxis("");
    } else if (chartType === "scatter") {
      setXAxis(numericCols[0] || "");
      setYAxis(numericCols[1] || numericCols[0] || "");
      setZAxis("");
    } else if (chartType === "3d-bar") {
      setXAxis(numericCols[0] || "");
      setYAxis(numericCols[1] || numericCols[0] || "");
      setZAxis("");
    } else if (chartType === "3d-scatter") {
      setXAxis(numericCols[0] || "");
      setYAxis(numericCols[1] || numericCols[0] || "");
      setZAxis(numericCols[2] || numericCols[0] || "");
    } else {
      setXAxis(catCols[0] || numericCols[0] || "");
      setYAxis(numericCols[0] || "");
      setZAxis("");
    }
    // eslint-disable-next-line
  }, [chartType, JSON.stringify(numericCols), JSON.stringify(catCols)]);

  // Download handlers
  const handleDownloadPNG = (ref, name = "chart") => {
    const chart = ref.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.png`;
    link.click();
  };

  const handleDownloadPDF = (ref, name = "chart") => {
    const chart = ref.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: [800, 600] });
    pdf.addImage(url, "PNG", 20, 20, 760, 560);
    pdf.save(`${name}.pdf`);
  };

  function renderChart(type, ref) {
    let chartData;
    if (type === "bar" && xAxis && yAxis) {
      const groups = {};
      data.forEach((row) => {
        const xVal = row[xAxis];
        const yVal = parseFloat(row[yAxis]);
        if (!isNaN(yVal)) {
          groups[xVal] = (groups[xVal] || 0) + yVal;
        }
      });
      chartData = {
        labels: Object.keys(groups),
        datasets: [
          {
            label: yAxis,
            data: Object.values(groups),
            backgroundColor: "#7e3af2",
          },
        ],
      };
      return (
        <>
          <div style={{ maxWidth: 800, margin: "0 auto", height: 400 }}>
            <Bar
              ref={ref}
              data={chartData}
              options={{
                plugins: { legend: { display: showLegend } },
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2.2,
              }}
            />
          </div>
          {chartData && chartData.labels.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
              <button
                className="chart-btn chart-btn--png"
                onClick={() => handleDownloadPNG(ref, type)}
              >
                Download PNG
              </button>
              <button
                className="chart-btn chart-btn--pdf"
                onClick={() => handleDownloadPDF(ref, type)}
              >
                Download PDF
              </button>
            </div>
          )}
        </>
      );
    } else if (type === "line" && xAxis && yAxis) {
      const groups = {};
      data.forEach((row) => {
        const xVal = row[xAxis];
        const yVal = parseFloat(row[yAxis]);
        if (!isNaN(yVal)) {
          groups[xVal] = (groups[xVal] || 0) + yVal;
        }
      });
      chartData = {
        labels: Object.keys(groups),
        datasets: [
          {
            label: yAxis,
            data: Object.values(groups),
            borderColor: "#7e3af2",
            backgroundColor: "rgba(126,58,242,0.2)",
            fill: true,
          },
        ],
      };
      return (
        <>
          <div style={{ maxWidth: 800, margin: "0 auto", height: 400 }}>
            <Line
              ref={ref}
              data={chartData}
              options={{
                plugins: { legend: { display: showLegend } },
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2.2,
              }}
            />
          </div>
          {chartData && chartData.labels.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
              <button
                className="chart-btn chart-btn--png"
                onClick={() => handleDownloadPNG(ref, type)}
              >
                Download PNG
              </button>
              <button
                className="chart-btn chart-btn--pdf"
                onClick={() => handleDownloadPDF(ref, type)}
              >
                Download PDF
              </button>
            </div>
          )}
        </>
      );
    } else if (type === "pie" && xAxis && yAxis) {
      const groups = {};
      data.forEach((row) => {
        const xVal = row[xAxis];
        const yVal = parseFloat(row[yAxis]);
        if (!isNaN(yVal)) {
          groups[xVal] = (groups[xVal] || 0) + yVal;
        }
      });
      chartData = {
        labels: Object.keys(groups),
        datasets: [
          {
            label: yAxis,
            data: Object.values(groups),
            backgroundColor: [
              "#7e3af2", "#5a32a3", "#e63946", "#f6c90e", "#28a745", "#17a2b8"
            ],
          },
        ],
      };
      return (
        <>
          <div style={{ maxWidth: 800, margin: "0 auto", height: 400 }}>
            <Pie
              ref={ref}
              data={chartData}
              options={{
                plugins: { legend: { display: showLegend } },
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2.2,
              }}
            />
          </div>
          {chartData && chartData.labels.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
              <button
                className="chart-btn chart-btn--png"
                onClick={() => handleDownloadPNG(ref, type)}
              >
                Download PNG
              </button>
              <button
                className="chart-btn chart-btn--pdf"
                onClick={() => handleDownloadPDF(ref, type)}
              >
                Download PDF
              </button>
            </div>
          )}
        </>
      );
    } else if (type === "scatter" && xAxis && yAxis) {
      chartData = {
        datasets: [
          {
            label: `${xAxis} vs ${yAxis}`,
            data: data
              .map((row) => ({
                x: Number(row[xAxis]),
                y: Number(row[yAxis]),
              }))
              .filter((pt) => !isNaN(pt.x) && !isNaN(pt.y)),
            backgroundColor: "#7e3af2",
          },
        ],
      };
      return (
        <>
          <div style={{ maxWidth: 800, margin: "0 auto", height: 400 }}>
            <Scatter
              ref={ref}
              data={chartData}
              options={{
                plugins: { legend: { display: showLegend } },
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2.2,
                scales: {
                  x: { title: { display: true, text: xAxis } },
                  y: { title: { display: true, text: yAxis } },
                },
              }}
            />
          </div>
          {chartData && chartData.datasets[0].data.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
              <button
                className="chart-btn chart-btn--png"
                onClick={() => handleDownloadPNG(ref, type)}
              >
                Download PNG
              </button>
              <button
                className="chart-btn chart-btn--pdf"
                onClick={() => handleDownloadPDF(ref, type)}
              >
                Download PDF
              </button>
            </div>
          )}
        </>
      );
    } else if (type === "3d-bar" && xAxis && yAxis) {
      return <Bar3D data={data} xKey={xAxis} yKey={yAxis} />;
    } else if (type === "3d-scatter" && xAxis && yAxis && zAxis) {
      return <Scatter3D data={data} xKey={xAxis} yKey={yAxis} zKey={zAxis} />;
    }
    return <div style={{ color: "#aaa" }}>No chart data</div>;
  }

  function renderAllCharts() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", marginTop: 24 }}>
        {chartTypes.map((type) => {
          if (!chartRefs.current[type]) chartRefs.current[type] = React.createRef();
          return (
            <div key={type} className="chart-all-card">
              <h4>{chartLabels[type]}</h4>
              {renderChart(type, chartRefs.current[type])}
            </div>
          );
        })}
      </div>
    );
  }

  // Single chart for selected type
  const chartComponent = renderChart(chartType, singleChartRef);

  // Axis options logic
  const xAxisOptions =
    chartType === "pie"
      ? catCols
      : chartType === "3d-bar" || chartType === "3d-scatter"
      ? numericCols
      : numericCols.concat(catCols);

  const yAxisOptions =
    chartType === "pie"
      ? []
      : chartType === "3d-bar" || chartType === "3d-scatter"
      ? numericCols
      : numericCols;

  const zAxisOptions = numericCols;

  return (
    <div className="chart-container">
      <ToastContainer />
      <div className="chart-controls">
        <div>
          <label className="form-label">Chart Type</label>
          <select
            className="form-select"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            disabled={showAll}
          >
            <optgroup label="2D Charts">
              <option value="bar">2D Bar Chart</option>
              <option value="line">2D Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="scatter">2D Scatter Plot</option>
            </optgroup>
            <optgroup label="3D Charts">
              <option value="3d-bar">3D Bar Chart</option>
              <option value="3d-scatter">3D Scatter Plot</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label className="form-label">X Axis</label>
          <select
            className="form-select"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            disabled={showAll}
          >
            {xAxisOptions.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Y Axis</label>
          <select
            className="form-select"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            disabled={chartType === "pie" || showAll}
          >
            {yAxisOptions.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
        {chartType === "3d-scatter" && (
          <div>
            <label className="form-label">Z Axis</label>
            <select
              className="form-select"
              value={zAxis}
              onChange={(e) => setZAxis(e.target.value)}
              disabled={showAll}
            >
              {zAxisOptions.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="checkbox-label">
          <input
            type="checkbox"
            checked={showLegend}
            onChange={() => setShowLegend((v) => !v)}
            disabled={chartType.startsWith("3d") || showAll}
            id="legend-toggle"
          />
          <label htmlFor="legend-toggle">Show Legend</label>
        </div>
      </div>
      <div className="chart-display">
        {loading ? (
          <div className="chart-loader">
            <span className="chart-spinner" /> Loading...
          </div>
        ) : showAll ? renderAllCharts() : (
          <div style={{ width: "100%" }}>
            {chartComponent}
          </div>
        )}
      </div>
      <div style={{ width: "100%", textAlign: "center", marginTop: 24 }}>
        <button
          className="upload-button"
          style={{ minWidth: 160 }}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Selected Chart" : "Show All Charts"}
        </button>
      </div>
    </div>
  );
};

export default ChartPanel;
