import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone, FaBrain, FaSearch, FaFileAlt } from 'react-icons/fa';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        { 
            id: 1, 
            title: "Nieuw Interview", 
            icon: <FaMicrophone />, 
            color: "#4CAF50",
            path: "/interviews/new"
        },
        { 
            id: 2, 
            title: "AI Matching", 
            icon: <FaBrain />, 
            color: "#2196F3",
            path: "/matching"
        },
        { 
            id: 3, 
            title: "Zoek Kandidaat", 
            icon: <FaSearch />, 
            color: "#9C27B0",
            path: "/kandidaten"
        },
        { 
            id: 4, 
            title: "Vacatures", 
            icon: <FaFileAlt />, 
            color: "#FF9800",
            path: "/vacatures"
        }
    ];

    const handleActionClick = (path) => {
        navigate(path);
    };

    return (
        <motion.div 
            className="quick-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {actions.map((action) => (
                <motion.div 
                    key={action.id}
                    className="action-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ backgroundColor: action.color }}
                    onClick={() => handleActionClick(action.path)}
                >
                    <div className="action-icon">{action.icon}</div>
                    <h3>{action.title}</h3>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default QuickActions; 