// src/pages/Dashboard.js

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import your CSS file for styling

function Dashboard() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"];
            if (validTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                setError("");
            } else {
                setError("Please upload a valid Excel (.xlsx, .xls) or CSV file.");
            }
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                alert("File uploaded successfully.");
                // You can also redirect or update state after successful upload
                navigate("/analytics"); // Redirect to the analytics page
            } else {
                setError(data.message || "File upload failed.");
            }
        } catch (err) {
            setError("Error uploading file.");
        }
    };

    return (
        <div className="dashboard-main">
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 70px)", marginTop: "70px" }}>
                <Row className="d-flex flex-column justify-content-center align-items-center rounded border p-4 bg-light">
                    <Col md={6} className="text-center">
                        <h3>Welcome to Excel Analytics Platform</h3>
                        <p className="mt-3">Upload your Excel or CSV file to analyze data.</p>
                    </Col>

                    <Col md={6}>
                        <input type="file" onChange={handleFileChange} />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button className="submit-btn mt-3" onClick={handleFileUpload}>Upload File</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
