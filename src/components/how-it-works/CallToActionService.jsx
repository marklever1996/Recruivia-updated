import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CallToActionService.css';

const CallToActionService = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <motion.div 
                    className="cta-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>
                        <span className="highlight">Admin-vrij</span> recruitment
                        <br />
                    </h2>
                    <p>Recruivia is AI-powered recruitment software, volledig op maat voor jouw organisatie.</p>
                    
                    <div className="cta-features">
                        <div className="feature">
                            <span className="feature-check">✓</span>
                            <span>Direct implementeerbaar</span>
                        </div>
                        <div className="feature">
                            <span className="feature-check">✓</span>
                            <span>Persoonlijke onboarding</span>
                        </div>
                        <div className="feature">
                            <span className="feature-check">✓</span>
                            <span>AI op maat voor jouw proces</span>
                        </div>
                    </div>

                    <div className="cta-buttons">
                        <Link to="/contact" className="cta-button primary">
                            Demo aanvragen
                        </Link>
                        {/* <Link to="/register" className="cta-button secondary">
                            Direct starten
                        </Link> */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToActionService; 