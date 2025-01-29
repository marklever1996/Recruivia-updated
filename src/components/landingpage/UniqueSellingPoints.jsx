import React from 'react';
import { FaClock, FaChartLine, FaRobot, FaLock } from 'react-icons/fa';
import './UniqueSellingPoints.css';

const UniqueSellingPoints = () => {
    const points = [
        {
            icon: <FaClock />,
            title: "70% Tijdsbesparing",
            description: "Automatiseer administratieve taken en focus op wat écht belangrijk is: menselijk contact",
            stat: "Gemiddeld 2 uur per gesprek bespaard"
        },
        {
            icon: <FaChartLine />,
            title: "Verbeterde Kwaliteit",
            description: "Consistente en gedetailleerde documentatie voor elk gesprek",
            stat: "100% accurate gespreksverslagen"
        },
        {
            icon: <FaRobot />,
            title: "AI-Gedreven Inzichten",
            description: "Krijg diepgaande analyses en aanbevelingen tijdens het recruitmentproces",
            stat: "Real-time feedback en suggesties"
        },
        {
            icon: <FaLock />,
            title: "Veilig & Compliant",
            description: "Volledig AVG-proof en met respect voor privacy",
            stat: "ISO 27001 gecertificeerd"
        }
    ];

    return (
        <section className="usp-section">
            <div className="usp-container">
                <div className="usp-header">
                    <h2>Waarom Recruivia?</h2>
                    <p>Ontdek hoe AI je recruitmentproces transformeert</p>
                </div>

                <div className="usp-grid">
                    {points.map((point, index) => (
                        <div 
                            className="usp-card" 
                            key={index}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="usp-icon">
                                {point.icon}
                            </div>
                            <h3>{point.title}</h3>
                            <p>{point.description}</p>
                            <div className="usp-stat">
                                {point.stat}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UniqueSellingPoints; 