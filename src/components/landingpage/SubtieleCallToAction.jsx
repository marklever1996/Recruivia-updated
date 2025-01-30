import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SubtieleCallToAction.css';

const SubtieleCallToAction = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const section = document.querySelector('.subtle-cta');
            if (section) {
                const rect = section.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                section.style.setProperty('--mouse-x', `${x}%`);
                section.style.setProperty('--mouse-y', `${y}%`);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
                        <span></span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SubtieleCallToAction; 