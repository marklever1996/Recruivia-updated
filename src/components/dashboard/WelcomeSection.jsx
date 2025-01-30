import React from 'react';
import { motion } from 'framer-motion';
import { FaRegClock } from 'react-icons/fa';

const WelcomeSection = ({ userName }) => {
    const currentTime = new Date().getHours();
    const greeting = currentTime < 12 ? "Goedemorgen" : currentTime < 18 ? "Goedemiddag" : "Goedenavond";

    return (
        <motion.div 
            className="welcome-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="welcome-content">
                <div className="welcome-header">
                    <h1>{greeting}, {userName}</h1>
                    <div className="last-activity">
                        <FaRegClock />
                        <span>Laatste activiteit: vandaag 09:45</span>
                    </div>
                </div>
                <div className="quick-stats">
                    <div className="stat-item">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Openstaande taken</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">5</span>
                        <span className="stat-label">Gesprekken vandaag</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">85%</span>
                        <span className="stat-label">Match rate</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeSection; 