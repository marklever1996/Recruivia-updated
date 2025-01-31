import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone, FaVideo, FaUpload } from 'react-icons/fa';
import './NewMeeting.css';

const NewMeeting = () => {
    const navigate = useNavigate();

    const options = [
        {
            icon: <FaVideo />,
            title: "Online Meeting",
            description: "Voeg AI toe aan je online gesprek",
            color: "#0EA5E9",
            path: "/online-meeting"
        },
        {
            icon: <FaUpload />,
            title: "Importeer Bestand",
            description: "Upload een audio of video bestand",
            color: "#10B981",
            path: "/import-recording"
        }
    ];

    const handleOptionClick = (path) => {
        navigate(path);
    };

    return (
        <div className="new-meeting-page">
            <div className="meeting-container">
                <motion.div 
                    className="meeting-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="meeting-header">
                        <h1>Nieuw Gesprek</h1>
                        <p>Kies hoe je het gesprek wilt opnemen</p>
                    </div>

                    <div className="meeting-options">
                        {options.map((option, index) => (
                            <motion.div
                                key={option.title}
                                className="option-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ '--accent-color': option.color }}
                                onClick={() => handleOptionClick(option.path)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="option-icon" style={{ background: option.color }}>
                                    {option.icon}
                                </div>
                                <div className="option-content">
                                    <h3>{option.title}</h3>
                                    <p>{option.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NewMeeting;
