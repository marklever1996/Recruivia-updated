import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FaMicrophone, 
    FaFileAlt, 
    FaUserCheck, 
    FaChartLine, 
    FaSearch,
    FaInbox,
    FaCheck
} from 'react-icons/fa';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            icon: <FaFileAlt />,
            title: "Vacature maken",
            description: "AI-vacaturetekst",
            color: "#0EA5E9",
            path: "/vacancy-dashboard"
        },
        {
            icon: <FaSearch />,
            title: "Kandidaten zoeken",
            description: "Database doorzoeken",
            color: "#F59E0B",
            path: "/dashboard-candidates"
        },
        {
            icon: <FaUserCheck />,
            title: "Match analyse",
            description: "CV matching",
            color: "#10B981",
            path: "/match-analysis"
        },
        {
            icon: <FaMicrophone />,
            title: "Gesprek opnemen",
            description: "Start opname",
            color: "#4F46E5",
            path: "/new-meeting"
        },
        {
            icon: <FaInbox />,
            title: "Sollicitaties",
            description: "Beheer aanmeldingen",
            color: "#EC4899",
            path: "/applications"
        },
        {
            icon: <FaCheck />,
            title: "Verbeterpunten",
            description: "Verbeterpunten",
            color: "#059669",
            path: "/improvements"
        }
    ];

    const handleActionClick = (path) => {
        navigate(path);
    };

    return (
        <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
                {actions.map((action, index) => (
                    <motion.div
                        key={action.title}
                        className="action-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ '--accent-color': action.color }}
                        onClick={() => handleActionClick(action.path)}
                    >
                        <div className="action-icon">{action.icon}</div>
                        <h3>{action.title}</h3>
                        <p>{action.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default QuickActions; 