import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaUser, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import './VacancyDetails.css';
import { useParams } from 'react-router-dom';

const VacancyDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        // Later vervangen door echte API call
        setIsLoading(true);
        // Simuleer API call
        setTimeout(() => {
            setVacancy({
                id: parseInt(id),
                title: "Senior React Developer",
                company: "TechCorp BV",
                location: "Amsterdam",
                created_at: "2024-02-20",
                status: "Actief",
                description: "Wij zoeken een ervaren React developer die ons team komt versterken. Je werkt aan uitdagende projecten en bent verantwoordelijk voor het ontwikkelen van hoogwaardige frontend applicaties.",
                requirements: [
                    "5+ jaar ervaring met React",
                    "Ervaring met TypeScript",
                    "Kennis van moderne frontend tools",
                    "Goede communicatieve vaardigheden",
                    "Ervaring met Agile/Scrum"
                ],
                salary: {
                    min: 4500,
                    max: 6500,
                    currency: "EUR"
                },
                matches: [
                    {
                        id: 1,
                        name: "John Doe",
                        matchPercentage: 95,
                        status: "Interview Gepland",
                        stage: 3,
                        lastActivity: "2024-02-25",
                        photo: "https://randomuser.me/api/portraits/men/1.jpg"
                    },
                    {
                        id: 2,
                        name: "Jane Smith",
                        matchPercentage: 88,
                        status: "CV Ontvangen",
                        stage: 1,
                        lastActivity: "2024-02-24",
                        photo: "https://randomuser.me/api/portraits/women/1.jpg"
                    },
                    {
                        id: 3,
                        name: "Mike Johnson",
                        matchPercentage: 92,
                        status: "Technische Test",
                        stage: 4,
                        lastActivity: "2024-02-23",
                        photo: "https://randomuser.me/api/portraits/men/2.jpg"
                    }
                ]
            });
            setIsLoading(false);
        }, 1000);
    }, [id]);

    if (isLoading) {
        return (
            <div className="vacancy-details-page">
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <p>Vacature laden...</p>
                </div>
            </div>
        );
    }

    if (!vacancy) {
        return (
            <div className="vacancy-details-page">
                <div className="error-message">
                    Vacature niet gevonden
                </div>
            </div>
        );
    }

    const stages = [
        "CV Ontvangen",
        "Eerste Screening",
        "Gesprek Gepland",
        "Technische Test",
        "Aanbod"
    ];

    return (
        <div className="vacancy-details-page">
            <div className="details-header">
                <motion.div 
                    className="header-content"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="title-section">
                        <h1>{vacancy.title}</h1>
                        <span className="status-badge">{vacancy.status}</span>
                    </div>
                    <div className="meta-info">
                        <div className="info-item">
                            <FaBuilding />
                            <span>{vacancy.company}</span>
                        </div>
                        <div className="info-item">
                            <FaMapMarkerAlt />
                            <span>{vacancy.location}</span>
                        </div>
                        <div className="info-item">
                            <FaClock />
                            <span>Geplaatst op {new Date(vacancy.created_at).toLocaleDateString('nl-NL')}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="details-content">
                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overzicht
                    </button>
                    <button 
                        className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
                        onClick={() => setActiveTab('matches')}
                    >
                        Matches
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <motion.div 
                        className="overview-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="stats-grid">
                            <div className="stat-card">
                                <FaUser className="stat-icon" />
                                <div className="stat-info">
                                    <h3>Totaal Kandidaten</h3>
                                    <p>24</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <FaChartLine className="stat-icon" />
                                <div className="stat-info">
                                    <h3>Gemiddelde Match</h3>
                                    <p>85%</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <FaCheckCircle className="stat-icon" />
                                <div className="stat-info">
                                    <h3>In Procedure</h3>
                                    <p>8</p>
                                </div>
                            </div>
                        </div>

                        <div className="details-grid">
                            <div className="detail-card">
                                <h3>Functieomschrijving</h3>
                                <p>{vacancy.description}</p>
                            </div>
                            <div className="detail-card">
                                <h3>Eisen</h3>
                                <ul>
                                    {vacancy.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="detail-card">
                                <h3>Salarisindicatie</h3>
                                <p>€{vacancy.salary.min} - €{vacancy.salary.max} per maand</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="matches-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="matches-grid">
                            {vacancy.matches.map((match) => (
                                <motion.div 
                                    key={match.id}
                                    className="match-card"
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="match-header">
                                        <img src={match.photo} alt={match.name} className="candidate-photo" />
                                        <div className="match-info">
                                            <h3>{match.name}</h3>
                                            <div className="match-percentage">
                                                <div className="percentage-bar">
                                                    <div 
                                                        className="percentage-fill"
                                                        style={{ width: `${match.matchPercentage}%` }}
                                                    />
                                                </div>
                                                <span>{match.matchPercentage}% match</span>
                                            </div>
                                        </div>
                                        <span className="stage-badge">
                                            {stages[match.stage - 1]}
                                        </span>
                                    </div>
                                    <div className="match-timeline">
                                        {stages.map((stage, index) => (
                                            <div 
                                                key={index}
                                                className={`timeline-point ${index + 1 <= match.stage ? 'completed' : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <button className="view-profile-btn">
                                        Bekijk Profiel
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default VacancyDetails; 