import React from 'react';
import { FaRobot, FaPencilAlt, FaBrain, FaChartLine } from 'react-icons/fa';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <FaPencilAlt />,
            title: "AI Gespreksnotities",
            description: "Richt je volledig op het gesprek terwijl AI automatisch notities maakt en belangrijke punten vastlegt.",
            features: [
                "Real-time transcriptie",
                "Automatische samenvattingen",
                "Belangrijke punten markering",
                "Beschikbaar voor alle gesprekken"
            ]
        },
        {
            icon: <FaRobot />,
            title: "Slimme Documenten",
            description: "Laat AI je helpen bij het maken van professionele vacatureteksten, kandidaatprofielen en gespreksverslagen.",
            features: [
                "AI-gedreven vacatureteksten",
                "Geautomatiseerde profielen",
                "Intelligente verslaglegging",
                "Consistente documentatie"
            ]
        },
        {
            icon: <FaBrain />,
            title: "Naadloze Integratie",
            description: "Werk efficiënter met automatische synchronisatie tussen onze AI-tools en je bestaande ATS systeem.",
            features: [
                "Directe ATS koppeling",
                "Automatische updates",
                "Tijdbesparende workflows",
                "Foutloze data-overdracht"
            ]
        }
    ];

    return (
        <section className="services-section">
            <div className="services-header">
                <h2>
                    <span className="accent">Recruitment versterkt met AI</span>
                    <span className="subtitle">Meer tijd voor wat écht belangrijk is</span>
                </h2>
                <p>
                    Verminder administratieve taken en focus je op waar je goed in bent: 
                    het vinden en verbinden van talent. Onze AI-tools ondersteunen je 
                    bij elke stap van het recruitmentproces.
                </p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div 
                        className="service-card" 
                        key={index}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="service-icon">
                            {service.icon}
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <ul className="features-list">
                            {service.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services; 