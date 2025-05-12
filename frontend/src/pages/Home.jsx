import React from "react";
import {Link} from "react-router-dom";
import {FaChartBar, FaRobot, FaCloudUploadAlt, FaPlayCircle} from "react-icons/fa";
import "./Home.css";
import heroImage from "../assets/heroImg.jpg"; // Assuming you have a hero image in your assets

const Home = () => (
    <div className="home-hero">
        {/* Hero Section */}
        <section className="hero-section">
            <div className="hero-content">
                <h1>
                    <span className="highlight">VisuaLyze - Analyze you Data</span>
                </h1>
                <p className="hero-subtitle">
                    Instantly turn your Excel and CSV data into{" "}
                    <span className="highlight">interactive dashboards</span> and{" "}
                    <span className="highlight">AI-powered insights</span>.
                </p>
                <div className="hero-cta">
                    <Link to="/dashboard" className="home-btn home-btn-primary">
                        <FaCloudUploadAlt className="home-btn-icon" /> Get Started
                    </Link>
                    <a href="#features" className="home-btn home-btn-secondary">
                        <FaPlayCircle className="home-btn-icon" /> See How It Works
                    </a>
                </div>
            </div>
            <img
                src={heroImage}
                alt="Data Analytics Illustration"
                className="hero-image"
            />
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
            <h2>Why VisuaLyze ?</h2>
            <div className="features-grid">
                <div className="feature-card">
                    <FaCloudUploadAlt className="feature-icon" />
                    <h3>Simple Upload</h3>
                    <p>Drag & drop your Excel or CSV files and get started in seconds.</p>
                </div>
                <div className="feature-card">
                    <FaChartBar className="feature-icon" />
                    <h3>Interactive Dashboards</h3>
                    <p>Visualize your data with beautiful, real-time charts and tables.</p>
                </div>
                <div className="feature-card">
                    <FaRobot className="feature-icon" />
                    <h3>AI Insights</h3>
                    <p>Let AI find trends, outliers, and actionable insights in your data.</p>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="how-section">
            <h2>How It Works</h2>
            <ol className="how-list">
                <li>
                    <strong>Upload:</strong> Import your Excel or CSV file.
                </li>
                <li>
                    <strong>Preview:</strong> Instantly see your data in a clean table.
                </li>
                <li>
                    <strong>Visualize:</strong> Explore interactive charts and dashboards.
                </li>
                <li>
                    <strong>AI Insights:</strong> Get automatic, smart summaries and recommendations.
                </li>
            </ol>
            {/* <Link to="/dashboard" className="home-btn home-btn-primary" style={{ marginTop: 24 }}>
        Try It Now
      </Link> */}
        </section>

        {/* Footer */}
        {/* <footer className="home-footer">
      <p>
        Trusted by data-driven teams. <span role="img" aria-label="sparkles">✨</span>
      </p>
      <p className="home-footer-links">
        <a href="mailto:support@visualyze.com">Contact</a> &middot; <a href="/privacy">Privacy</a>
      </p>
      <div className="home-footer-copy">
        &copy; {new Date().getFullYear()} Excel-Analytics Platform
      </div>
    </footer> */}
    </div>
);

export default Home;
