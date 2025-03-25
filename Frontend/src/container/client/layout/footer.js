import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About <span>Electro</span>Salam</h2>
                    <p>Your one-stop shop for the latest tech products, from smartphones to laptops and more!</p>
                    <div className="social-icons">
                        <a href="google.com">Facebook</a>
                        <a href="google.com">Twitter</a>
                        <a href="google.com">Instagram</a>
                        <a href="google.com">LinkedIn</a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/About">About Us</Link></li>
                        <li><Link to="/Help">Help</Link></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: info@electrosalam.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 ElectroSalam. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
