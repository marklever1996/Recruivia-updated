import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaMicrophone, 
    FaRobot, 
    FaFileAlt, 
    FaChartLine,
    FaArrowRight,
    FaUserTie,
    FaRegLightbulb,
    FaRegComments
} from 'react-icons/fa';
import './OurApproach.css';

const OurApproach = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: <FaMicrophone />,
            title: "AI Gesprekstranscriptie",
            description: "Neem gesprekken op en ontvang direct een gedetailleerd verslag met de belangrijkste punten",
            benefits: [
                "Real-time transcriptie tijdens gesprekken",
                "Automatische highlight van kernpunten",
                "Gestructureerde gespreksverslagen",
                "Tijdbesparing in administratie"
            ],
            preview: "interview_transcript.png"
        },
        {
            icon: <FaRegLightbulb />,
            title: "Recruiter Feedback",
            description: "Krijg waardevolle inzichten en verbeterpunten na elk gesprek",
            benefits: [
                "Analyse van gesprekstechnieken",
                "Persoonlijke verbeterpunten",
                "Benchmark met best practices",
                "Continue professionele ontwikkeling"
            ],
            preview: "feedback_analysis.png"
        },
        {
            icon: <FaFileAlt />,
            title: "AI Vacatureteksten",
            description: "Genereer professionele vacatureteksten die perfect aansluiten bij je bedrijfscultuur",
            benefits: [
                "Automatische huisstijl integratie",
                "SEO-geoptimaliseerde content",
                "Inclusieve taal checker",
                "Aanpasbare templates"
            ],
            preview: "job_posting.png"
        },
        {
            icon: <FaChartLine />,
            title: "Kandidaat Match Analyse",
            description: "Analyseer hoe goed kandidaten passen bij de functie-eisen en bedrijfscultuur",
            benefits: [
                "Skills matching score",
                "Cultuur fit analyse",
                "Competentie vergelijking",
                "Datagedreven beslissingen"
            ],
            preview: "candidate_match.png"
        }
    ];

    return (
        <section className="our-approach">
            <div className="approach-container">
                <motion.div 
                    className="approach-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Onze Aanpak</h2>
                    <p>
                        Optimaliseer je recruitment proces met AI-gedreven oplossingen die 
                        tijd besparen en de kwaliteit verhogen
                    </p>
                </motion.div>

                <div className="features-grid">
                    <div className="features-list">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                                onClick={() => setActiveFeature(index)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <div className="feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                                <FaArrowRight className="arrow-icon" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        className="feature-details"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        key={activeFeature}
                    >
                        <div className="details-content">
                            <h3>
                                <span className="icon">{features[activeFeature].icon}</span>
                                {features[activeFeature].title}
                            </h3>
                            <p>{features[activeFeature].description}</p>
                            
                            <ul className="benefits-list">
                                {features[activeFeature].benefits.map((benefit, index) => (
                                    <motion.li 
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <FaUserTie className="benefit-icon" />
                                        {benefit}
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="feature-preview">
                                <div className="preview-placeholder">
                                    {activeFeature === 0 && (
                                        <div className="transcript-preview">
                                            <div className="preview-header">
                                                <div className="recording-indicator">● Live</div>
                                                <div className="preview-title">Interview Transcriptie</div>
                                            </div>
                                            <div className="transcript-lines">
                                                <div className="speaker">Interviewer:</div>
                                                <div className="text-line"></div>
                                                <div className="text-line"></div>
                                                <div className="speaker">Kandidaat:</div>
                                                <div className="text-line"></div>
                                                <div className="text-line"></div>
                                                <div className="highlight-box">
                                                    <div className="highlight-marker">Belangrijke punten</div>
                                                    <div className="highlight-line"></div>
                                                    <div className="highlight-line"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeFeature === 1 && (
                                        <div className="feedback-preview">
                                            <div className="feedback-score">
                                                <svg viewBox="0 0 36 36" className="circular-chart">
                                                    <path className="circle-bg"
                                                        d="M18 2.0845
                                                        a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <path className="circle"
                                                        strokeDasharray="85, 100"
                                                        d="M18 2.0845
                                                        a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <text x="18" y="20.35" className="percentage">85%</text>
                                                </svg>
                                            </div>
                                            <div className="feedback-points">
                                                <div className="point-line"></div>
                                                <div className="point-line"></div>
                                                <div className="point-line"></div>
                                            </div>
                                        </div>
                                    )}
                                    {activeFeature === 2 && (
                                        <div className="vacancy-preview">
                                            <div className="vacancy-content">
                                                {/* Titel sectie */}
                                                <div className="content-line title-line"></div>
                                                <div className="content-line title-line-small"></div>
                                                
                                                {/* Functie details */}
                                                <div className="content-group">
                                                    <div className="content-line"></div>
                                                    <div className="content-line line-short"></div>
                                                    <div className="content-line line-medium"></div>
                                                </div>

                                                {/* Verantwoordelijkheden */}
                                                <div className="content-group">
                                                    <div className="content-line"></div>
                                                    <div className="content-line line-medium"></div>
                                                    <div className="content-line line-long"></div>
                                                    <div className="content-line line-short"></div>
                                                </div>

                                                {/* Eisen */}
                                                <div className="content-group">
                                                    <div className="content-line"></div>
                                                    <div className="content-line line-medium"></div>
                                                    <div className="content-line line-short"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeFeature === 3 && (
                                        <div className="match-preview">
                                            <div className="match-header">
                                                <div className="match-score">
                                                    <svg viewBox="0 0 36 36" className="circular-chart">
                                                        <path className="circle-bg"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path className="circle"
                                                            strokeDasharray="92, 100"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <text x="18" y="20.35" className="percentage">92%</text>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="match-categories">
                                                <div className="category">
                                                    <div className="category-label">Technical Skills</div>
                                                    <div className="category-bar">
                                                        <div className="bar-fill" style={{width: "95%"}}></div>
                                                    </div>
                                                </div>
                                                <div className="category">
                                                    <div className="category-label">Culture Fit</div>
                                                    <div className="category-bar">
                                                        <div className="bar-fill" style={{width: "88%"}}></div>
                                                    </div>
                                                </div>
                                                <div className="category">
                                                    <div className="category-label">Experience</div>
                                                    <div className="category-bar">
                                                        <div className="bar-fill" style={{width: "90%"}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurApproach; 