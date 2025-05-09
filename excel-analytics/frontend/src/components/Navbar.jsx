import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="top-bar"></div> {/* Add this for the dark top bar */}
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          VisuaLyze {/* Updated logo text */}
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-link btn-login">
              <FaSignInAlt className="nav-icon" /> Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link btn-signup"> {/* Changed to signup */}
              <FaUserPlus className="nav-icon" /> Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;