import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = ({ userName }) => {
    return (
        <motion.div 
            className="welcome-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="welcome-text">
                <h1>Welkom terug, {userName}</h1>
                <p>Hier is een overzicht van je recruitment activiteiten</p>
            </div>
        </motion.div>
    );
};

export default WelcomeSection; 