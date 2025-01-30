import React from 'react';
import { motion } from 'framer-motion';
import { FaRegComments, FaRegFileAlt, FaRegCheckCircle } from 'react-icons/fa';

const RecentActivity = () => {
    const activities = [
        {
            icon: <FaRegComments />,
            title: "Gesprek met Sarah Johnson",
            description: "Senior React Developer positie",
            time: "1 uur geleden",
            type: "interview"
        },
        {
            icon: <FaRegFileAlt />,
            title: "Vacaturetekst gegenereerd",
            description: "UX Designer",
            time: "2 uur geleden",
            type: "vacancy"
        },
        {
            icon: <FaRegCheckCircle />,
            title: "Match analyse voltooid",
            description: "85% match voor Frontend Developer",
            time: "3 uur geleden",
            type: "match"
        }
    ];

    return (
        <div className="recent-activity">
            <h2>Recente Activiteit</h2>
            <div className="activity-list">
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        className={`activity-item ${activity.type}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="activity-icon">{activity.icon}</div>
                        <div className="activity-content">
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
                        </div>
                        <span className="activity-time">{activity.time}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity; 