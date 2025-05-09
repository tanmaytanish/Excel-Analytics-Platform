import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">VisuaLyze</div>
                <div className="footer-contact">
                    <p>
                        Email: <a href="mailto:support@visualyze.com">support@visualyze.com</a>
                    </p>
                    <p>
                        Phone: <a href="tel:+918458005099">+91 8458005099</a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <span role="img" aria-label="sparkle">✨</span> 
                &nbsp;© {new Date().getFullYear()} <b>VisuaLyze</b>. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
