import React from 'react';
import { Link } from 'react-router-dom';
import './SubtieleCallToAction.css';

const SubtieleCallToAction = () => {
    return (
        <section className="subtle-cta">
            <div className="subtle-cta-container">
                <div className="subtle-cta-content">
                    <span className="subtle-label">Klaar voor de toekomst?</span>
                    <h2>
                        Begin vandaag nog met het optimaliseren van je recruitmentproces
                    </h2>
                    <Link to="/register" className="subtle-cta-button">
                        Start gratis demo
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SubtieleCallToAction; 