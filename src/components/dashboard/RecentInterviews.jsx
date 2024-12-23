import React from 'react';
import { motion } from 'framer-motion';

const RecentInterviews = ({ interviews }) => {
    return (
        <motion.div 
            className="recent-interviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <h2>Recente Interviews</h2>
            <div className="interviews-table">
                <div className="table-header">
                    <span>Kandidaat</span>
                    <span>Functie</span>
                    <span>Datum</span>
                    <span>Status</span>
                </div>
                {interviews.map((interview) => (
                    <div key={interview.id} className="table-row">
                        <span>{interview.candidate}</span>
                        <span>{interview.position}</span>
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                        <span className={`status ${interview.status.toLowerCase()}`}>
                            {interview.status}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentInterviews; 