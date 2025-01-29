import React from 'react';
import { Link } from 'react-router-dom';
import aiMain from '../../assets/images/ai-main.jpg';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="section">
            <img src={aiMain} alt="AI Recruitment" />
            <div className="section-content">
                <h1>Het AI-gedreven recruitmentsoftware</h1>
                <p>
                    Bespaar tijd, verlaag kosten, en verbeter je hiring proces met onze slimme technologie. 
                    Ontdek hoe ons platform je recruitmentstrategie naar een hoger niveau tilt – eenvoudig, 
                    efficiënt, en toekomstgericht.
                </p>
                <Link to="/register" className="section-button">Probeer gratis</Link>
            </div>
        </section>
    );
};

export default HeroSection; 