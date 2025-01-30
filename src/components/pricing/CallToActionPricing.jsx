import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaArrowRight, FaCheck } from 'react-icons/fa';
import './CallToActionPricing.css';

const CallToActionPricing = () => {
    return (
        <section className="cta-pricing">
            <div className="cta-pricing-container">
                <motion.div 
                    className="cta-pricing-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="cta-pricing-grid">
                        <div className="cta-pricing-left">
                            <FaRocket className="cta-pricing-icon" />
                            <h2>
                                Start vandaag nog met <span className="highlight">AI-powered</span> recruitment
                            </h2>
                            <div className="cta-benefits">
                                <div className="benefit">
                                    <FaCheck className="check-icon" />
                                    <span>14 dagen gratis uitproberen</span>
                                </div>
                                <div className="benefit">
                                    <FaCheck className="check-icon" />
                                    <span>Geen creditcard nodig</span>
                                </div>
                                <div className="benefit">
                                    <FaCheck className="check-icon" />
                                    <span>Direct aan de slag</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="cta-pricing-right">
                            <Link to="/register" className="cta-pricing-button">
                                <span>Start gratis demo</span>
                                <FaArrowRight className="arrow-icon" />
                                <div className="button-glow"></div>
                            </Link>
                            <p className="support-text">
                                Of <Link to="/contact" className="contact-link">neem contact op</Link> voor een persoonlijk gesprek
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToActionPricing; 