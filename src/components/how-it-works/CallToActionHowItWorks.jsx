import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaArrowRight } from 'react-icons/fa';
import './CallToActionHowItWorks.css';

const CallToActionHowItWorks = () => {
    return (
        <section className="cta-how-it-works">
            <div className="cta-hiw-container">
                <motion.div 
                    className="cta-hiw-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="cta-hiw-grid">
                        <div className="cta-hiw-left">
                            <FaRocket className="cta-hiw-icon" />
                            <h2>
                                Klaar om recruitment te <span className="highlight">automatiseren</span>?
                            </h2>
                            <p>
                                Start vandaag nog met AI-powered recruitment en ervaar zelf het verschil.
                            </p>
                        </div>
                        
                        <div className="cta-hiw-right">
                            <div className="cta-hiw-features">
                                <div className="feature">
                                    <span className="feature-dot"></span>
                                    Direct implementeerbaar
                                </div>
                                <div className="feature">
                                    <span className="feature-dot"></span>
                                    14 dagen gratis
                                </div>
                                <div className="feature">
                                    <span className="feature-dot"></span>
                                    Persoonlijke demo
                                </div>
                            </div>
                            
                            <Link to="/contact" className="cta-hiw-button">
                                <span>Demo aanvragen</span>
                                <FaArrowRight className="arrow-icon" />
                                <div className="button-glow"></div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToActionHowItWorks; 