import React, { useState } from "react";
import "./Dashboard.css";
import { FiUpload } from "react-icons/fi";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      handleFileUpload(droppedFile); // auto-submit
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      handleFileUpload(selectedFile); // auto-submit
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

  const handleFileUpload = (fileToUpload) => {
    // Actual upload logic here (e.g., FormData + axios/fetch)
    console.log("Uploading file:", fileToUpload.name);
  };

  return (
    <div className="dashboard-container">
      <h2 className="main-title">ChartSense Excel Analytics</h2>
      <p className="subtitle">
        Upload Excel or CSV files to create beautiful visualizations and discover insights from your data
      </p>

      <div className="nav-buttons">
        <div className="tab active">Upload</div>
        <div className="tab">Visualize</div>
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
    </div>
  );
};

export default Dashboard;
