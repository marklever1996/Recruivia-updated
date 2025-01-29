import React, { useState } from 'react';
import { FaMicrophone, FaRobot, FaFileAlt, FaCheck } from 'react-icons/fa';
import './DemoSection.css';

const DemoSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    
    const demoSteps = [
        {
            icon: <FaMicrophone />,
            title: "Gesprek Opnemen",
            description: "Start het gesprek en laat AI alles vastleggen",
            demo: "Hallo, welkom bij het sollicitatiegesprek...",
        },
        {
            icon: <FaRobot />,
            title: "AI Verwerking",
            description: "AI analyseert het gesprek in real-time",
            demo: "Analyseren van kernpunten...\nExtraheren van belangrijke informatie...",
        },
        {
            icon: <FaFileAlt />,
            title: "Automatische Documentatie",
            description: "Direct een professioneel gespreksverslag",
            demo: "Gespreksverslag:\n- Sterke communicatieve vaardigheden\n- 5 jaar relevante ervaring\n- Beschikbaar per direct",
        },
        {
            icon: <FaCheck />,
            title: "Klaar voor Gebruik",
            description: "Direct delen met het team",
            demo: "Verslag geëxporteerd en gedeeld met recruitment team",
        }
    ];

    return (
        <section className="demo-section">
            <div className="demo-container">
                <div className="demo-header">
                    <h2>Zie hoe het werkt</h2>
                    <p>Ervaar zelf hoe eenvoudig het is om AI te integreren in je recruitmentproces</p>
                </div>

                <div className="demo-content">
                    <div className="demo-steps">
                        {demoSteps.map((step, index) => (
                            <div 
                                key={index}
                                className={`demo-step ${index === activeStep ? 'active' : ''}`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="step-icon">
                                    {step.icon}
                                </div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="demo-preview">
                        <div className="preview-window">
                            <div className="preview-header">
                                <div className="preview-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className="preview-title">Demo Preview</span>
                            </div>
                            <div className="preview-content">
                                <pre>{demoSteps[activeStep].demo}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection; 