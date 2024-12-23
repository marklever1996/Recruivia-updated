import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Recruivia</h3>
                    <p>AI-gedreven recruitment software voor de moderne recruiter.</p>
                    <div className="social-links">
                        <a href="https://www.instagram.com/leverwebdesign/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/mark-lever-5b2b07121/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/yourusername" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           aria-label="GitHub">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/how-it-works">Hoe het werkt</Link></li>
                        <li><Link to="/#pricing">Prijzen</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Algemene Voorwaarden</Link></li>
                        <li><Link to="/cookies">Cookie Beleid</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h4>Contact</h4>
                    <p>Email: info@recruivia.nl</p>
                    <p>Tel: +31 (0)6 12345678</p>
                    <p>KVK: 94208603</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Lever Web Design. Alle rechten voorbehouden.</p>
            </div>
        </footer>
    );
};

export default Footer; 