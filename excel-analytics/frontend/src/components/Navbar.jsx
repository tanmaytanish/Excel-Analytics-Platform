import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import "./Navbar.css";

function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // On mount, check if a username is stored
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    // Optionally redirect to home or login
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="top-bar"></div>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          VisuaLyze
        </Link>
        <ul className="nav-menu">
          {username ? (
            <>
              <li className="nav-item nav-username">
                <FaUserCircle className="nav-icon" />
                <span>{username}</span>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-login" onClick={handleLogout}>
                  <FaSignOutAlt className="nav-icon" /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link btn-login">
                  <FaSignInAlt className="nav-icon" /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link btn-signup">
                  <FaUserPlus className="nav-icon" /> Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
