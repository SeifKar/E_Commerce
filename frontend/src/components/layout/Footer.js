import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Tuzo is your one-stop shop for all your e-commerce needs. We provide
            quality products at competitive prices.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/profile">My Account</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@tuzo.com</li>
            <li>Phone: +254 124 567 8900</li>
            <li>Address: Luthuli St, Nairobi City</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tuzo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
