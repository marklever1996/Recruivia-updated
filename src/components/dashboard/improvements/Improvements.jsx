import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaChartLine, 
    FaRegClock, 
    FaUserCheck, 
    FaComments, 
    FaExclamationCircle,
    FaCheckCircle,
    FaInfoCircle
} from 'react-icons/fa';
import './Improvements.css';

const Improvements = () => {
    // Voorbeeld data (later te vervangen door API calls)
    const kpis = [
        {
            title: "Gemiddelde tijd tot hire",
            value: "28 dagen",
            trend: "-12%",
            isPositive: true,
            icon: <FaRegClock />
        },
        {
            title: "Kandidaat acceptatie ratio",
            value: "68%",
            trend: "+5%",
            isPositive: true,
            icon: <FaUserCheck />
        },
        {
            title: "Gesprekken per week",
            value: "12",
            trend: "-3",
            isPositive: false,
            icon: <FaComments />
        }
    ];

    const feedbackItems = [
        {
            id: 1,
            type: 'improvement',
            title: 'Technische screening verbeteren',
            description: 'Uit recente gesprekken blijkt dat kandidaten vaak niet het verwachte technische niveau hebben. Overweeg een technische pre-screening toe te voegen.',
            impact: 'Hoog',
            source: 'Analyse van 8 gesprekken',
            date: '2 dagen geleden'
        },
        {
            id: 2,
            type: 'positive',
            title: 'Sterke cultuur communicatie',
            description: 'Kandidaten waarderen de duidelijke communicatie over bedrijfscultuur en waarden. Dit leidt tot betere matches.',
            impact: 'Medium',
            source: 'Feedback van 12 kandidaten',
            date: '1 week geleden'
        },
        {
            id: 3,
            type: 'attention',
            title: 'Salarisindicatie eerder bespreken',
            description: 'Veel gesprekken stranden in late fase door verschillende salarisverwachtingen. Bespreek dit eerder in het proces.',
            impact: 'Hoog',
            source: 'Analyse van 5 afgewezen aanbiedingen',
            date: '3 dagen geleden'
        }
    ];

    return (
        <div className="improvements-page">
            <div className="improvements-container">
                <motion.div 
                    className="header-section"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Verbeterpunten & Inzichten</h1>
                    <p>AI-analyse van gesprekken en recruitment data</p>
                </motion.div>

                <motion.div 
                    className="kpi-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2>Key Performance Indicators</h2>
                    <div className="kpi-grid">
                        {kpis.map((kpi, index) => (
                            <motion.div 
                                key={kpi.title}
                                className="kpi-card"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="kpi-icon">{kpi.icon}</div>
                                <div className="kpi-content">
                                    <h3>{kpi.title}</h3>
                                    <div className="kpi-stats">
                                        <span className="kpi-value">{kpi.value}</span>
                                        <span className={`kpi-trend ${kpi.isPositive ? 'positive' : 'negative'}`}>
                                            {kpi.trend}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    className="feedback-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>Feedback & Aanbevelingen</h2>
                    <div className="feedback-grid">
                        {feedbackItems.map((item, index) => (
                            <motion.div 
                                key={item.id}
                                className={`feedback-card ${item.type}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="feedback-header">
                                    {item.type === 'improvement' && <FaExclamationCircle className="feedback-icon" />}
                                    {item.type === 'positive' && <FaCheckCircle className="feedback-icon" />}
                                    {item.type === 'attention' && <FaInfoCircle className="feedback-icon" />}
                                    <h3>{item.title}</h3>
                                </div>
                                <p className="feedback-description">{item.description}</p>
                                <div className="feedback-meta">
                                    <span className="impact-badge">Impact: {item.impact}</span>
                                    <span className="feedback-source">{item.source}</span>
                                </div>
                                <div className="feedback-date">{item.date}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Improvements; 