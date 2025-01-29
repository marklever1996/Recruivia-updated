import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaArrowRight } from 'react-icons/fa';
import './CallToAction.css';

const CallToAction = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-content">
                    <div className="cta-header">
                        <FaRocket className="cta-icon" />
                        <h2>
                            Klaar om te starten met AI-powered recruitment?
                        </h2>
                        <p>
                            Begin vandaag nog met een gratis demo. Geen verplichtingen, direct toegang.
                        </p>
                    </div>
                    
                    <div className="cta-features">
                        <ul>
                            <li>14 dagen gratis uitproberen</li>
                            <li>Volledige toegang tot alle features</li>
                            <li>Persoonlijke ondersteuning</li>
                            <li>Direct aan de slag</li>
                        </ul>
                    </div>

                    <div className="cta-actions">
                        <Link to="/register" className="cta-button primary">
                            Start gratis demo
                            <FaArrowRight />
                        </Link>
                        <Link to="/contact" className="cta-button secondary">
                            Neem contact op
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction; 