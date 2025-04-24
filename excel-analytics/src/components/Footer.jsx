import React from "react";
import "./Footer.css"; // Adjust the path as necessary

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">MyLogo</div>
                    <div className="footer-contact">
                        <p>
                            Email: <a href="mailto:support@rentease.com">support@visualyze.com</a>
                        </p>
                        <p>
                            Phone: <a href="tel:+918458005099">+91 8458005099</a>
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">© {new Date().getFullYear()} VisuaLyze. All rights reserved.</div>
            </footer>
        </div>
    );
}

export default Footer;
