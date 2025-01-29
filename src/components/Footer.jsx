import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: {
            title: "Product",
            links: [
                { name: "Features", path: "/features" },
                { name: "Prijzen", path: "/pricing" },
                { name: "Demo", path: "/register" },
                { name: "Roadmap", path: "/roadmap" }
            ]
        },
        resources: {
            title: "Resources",
            links: [
                { name: "Blog", path: "/blog" },
                { name: "Documentatie", path: "/docs" },
                { name: "Support", path: "/support" },
                { name: "API", path: "/api" }
            ]
        },
        company: {
            title: "Bedrijf",
            links: [
                { name: "Over ons", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Careers", path: "/careers" },
                { name: "Partners", path: "/partners" }
            ]
        },
        legal: {
            title: "Legal",
            links: [
                { name: "Privacy", path: "/privacy" },
                { name: "Voorwaarden", path: "/terms" },
                { name: "Cookie Policy", path: "/cookies" },
                { name: "Security", path: "/security" }
            ]
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src={logo} alt="Recruivia" />
                        </Link>
                        <p className="footer-tagline">
                            Transformeer je recruitmentproces met AI
                        </p>
                        <div className="footer-social">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="mailto:info@recruivia.com">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        {Object.values(footerLinks).map((section) => (
                            <div key={section.title} className="footer-section">
                                <h3>{section.title}</h3>
                                <ul>
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link to={link.path}>{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-info">
                        <p>&copy; {currentYear} Recruivia. Alle rechten voorbehouden.</p>
                        <address>
                            Recruivia B.V. | KvK: 12345678 | BTW: NL123456789B01<br />
                            Hoofdkantoor: Hyacinthstraat 198, 9713 XL Groningen
                        </address>
                    </div>
                    <div className="footer-certifications">
                        <span>ISO 27001 Gecertificeerd</span>
                        <span>AVG Compliant</span>
                        <span>SOC 2 Type II</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 