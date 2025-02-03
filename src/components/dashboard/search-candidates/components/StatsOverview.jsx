import React from 'react';
import { motion } from 'framer-motion';
import './StatsOverview.css';

const StatsOverview = () => {
    const stats = {
        totalCandidates: 245,
        activeVacancies: 12,
        newMatches: 18,
        responseRate: "85%"
    };

    return (
        <div className="stats-overview">
            <motion.div 
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3>Totaal Kandidaten</h3>
                <p>{stats.totalCandidates}</p>
            </motion.div>
            <motion.div 
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h3>Actieve Vacatures</h3>
                <p>{stats.activeVacancies}</p>
            </motion.div>
            <motion.div 
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3>Nieuwe Matches</h3>
                <p>{stats.newMatches}</p>
            </motion.div>
            <motion.div 
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h3>Response Rate</h3>
                <p>{stats.responseRate}</p>
            </motion.div>
        </div>
    );
};

export default StatsOverview; 