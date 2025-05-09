import React, { useState, useRef } from "react";
import "./Dashboard.css";
import { FiUpload } from "react-icons/fi";
import { parseFile } from "../utils/parseFile";
import DataPreview from "../components/DataPreview";
import ChartPanel from "../components/ChartPanel";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  // Ref for ChartPanel section
  const chartPanelRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      await handleFileUpload(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      await handleFileUpload(selectedFile);
    }
  };

  const validateFile = (selectedFile) => {
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!selectedFile) {
      setError("Please select a file.");
      return false;
    }
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only .xlsx, .xls, or .csv files are allowed.");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileUpload = async (fileToUpload) => {
    try {
      const parsedData = await parseFile(fileToUpload);
      setData(parsedData);
      setError("");
    } catch (err) {
      setError("Failed to parse file.");
      setData([]);
    }
  };

  // Scroll to ChartPanel when Visualize is clicked
  const handleVisualizeClick = () => {
    if (chartPanelRef.current) {
      chartPanelRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="main-title">VisuaLyze</h2>
      <p className="subtitle">
        Upload Excel or CSV files to create beautiful visualizations and discover insights from your data
      </p>

      <div className="nav-buttons">
        <div className="tab active">Upload</div>
        <div className="tab" onClick={handleVisualizeClick}>Visualize</div>
        <div className="tab">Insights</div>
      </div>

      <div
        className="upload-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-icon">
          <FiUpload />
        </div>
        <div className="upload-instruction">Drag and drop your file here</div>
        <div className="upload-subtext">
          Support for .XLSX, .XLS, and .CSV files
        </div>

        <label htmlFor="file-upload" className="upload-button">
          Browse Files
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        {file && <div className="filename">Selected: {file.name}</div>}
        {error && <div className="error">{error}</div>}
      </div>

      {/* Show preview and charts only if data is loaded */}
      {data.length > 0 && (
        <>
          <DataPreview data={data} />
          <div ref={chartPanelRef}>
            <ChartPanel data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
