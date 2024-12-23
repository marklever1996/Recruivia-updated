import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaFileAlt, FaChartLine } from 'react-icons/fa';

const StatisticsGrid = ({ statistics }) => {
    return (
        <motion.div 
            className="statistics-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <StatCard 
                icon={<FaUserTie />}
                title="Totaal Interviews"
                value={statistics.totalInterviews}
            />
            <StatCard 
                icon={<FaFileAlt />}
                title="Actieve Vacatures"
                value={statistics.activeVacancies}
            />
            <StatCard 
                icon={<FaChartLine />}
                title="Potentiële Kandidaten"
                value={statistics.potentialCandidates}
            />
        </motion.div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <div className="stat-card">
        {React.cloneElement(icon, { className: "stat-icon" })}
        <div className="stat-info">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

export default StatisticsGrid; 