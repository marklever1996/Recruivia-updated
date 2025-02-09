import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaVideo, FaCalendar } from 'react-icons/fa';
import './MeetingOverview.css';

const MeetingOverview = () => {
    const navigate = useNavigate();

    // Placeholder data - later te vervangen door API data
    const meetings = [
        {
            id: 1,
            title: "Interview met Sarah Johnson - Senior Developer",
            date: "2024-03-15",
            thumbnail: "https://placehold.co/400x225"
        },
        {
            id: 2,
            title: "Teambespreking Frontend Vacature",
            date: "2024-03-14",
            thumbnail: "https://placehold.co/400x225"
        },
        {
            id: 3,
            title: "Tweede Gesprek Mark Peters",
            date: "2024-03-13",
            thumbnail: "https://placehold.co/400x225"
        }
    ];

    return (
        <div className="meeting-overview">

            <div className="meetings-grid">
                {/* Nieuwe Meeting Card */}
                <motion.div 
                    className="meeting-card new-meeting"
                    onClick={() => navigate('/new-meeting')}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="new-meeting-content">
                        <div className="icon-wrapper">
                            <FaVideo />
                        </div>
                        <h3>Nieuw Gesprek Opnemen</h3>

                    </div>
                </motion.div>

                {/* Meeting Cards */}
                {meetings.map((meeting, index) => (
                    <motion.div
                        key={meeting.id}
                        className="meeting-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="thumbnail">
                            <img src={meeting.thumbnail} alt={meeting.title} />
                            <div className="play-overlay">
                                <FaVideo />
                            </div>
                        </div>
                        <div className="meeting-info">
                            <h3>{meeting.title}</h3>
                            <div className="meeting-date">
                                <FaCalendar />
                                <span>{new Date(meeting.date).toLocaleDateString('nl-NL', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MeetingOverview;
