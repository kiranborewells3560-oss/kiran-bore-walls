import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/Logo.png" alt="Kiran Bore Walls" className="footer-logo" />
            <div>
              <h3>Kiran Bore Walls</h3>
              <p>Your trusted partner for quality bore wall parts</p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/#products">Products</Link>
              <Link to="/#about">About Us</Link>
              <Link to="/#contact">Contact</Link>
            </div>

            <div className="footer-section">
              <h4>Categories</h4>
              <Link to="/#products">Lock and Nuts</Link>
              <Link to="/#products">Camera Set</Link>
              <Link to="/#products">Motor Spare</Link>
            </div>

            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>📞 +91 78290 49303</p>
              <p>📞 +91 72041 01558</p>
              <p>✉️ kiranborewells3560@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Kiran Bore Walls. All rights reserved.</p>
          <div className="footer-trust">
            <span>🔒 Secure Payments</span>
            <span>✓ Genuine Products</span>
            <span>🚚 Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
