import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaBuilding, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import './VacancyDashboard.css';

const VacancyDashboard = () => {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/vacancies');
            if (!response.ok) throw new Error('Er ging iets mis bij het ophalen van de vacatures');
            const data = await response.json();
            setVacancies(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error:', err);
            setVacancies([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="vacancy-dashboard">
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <p>Vacatures laden...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="vacancy-dashboard">
            <div className="vacancies-grid">
                <motion.div 
                    className="vacancy-card new-vacancy"
                    onClick={() => navigate('/create-vacancy')}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="new-vacancy-content">
                        <div className="icon-wrapper">
                            <FaPlus />
                        </div>
                        <h3>Nieuwe Vacature</h3>
                    </div>
                </motion.div>

                {vacancies.map((vacancy, index) => (
                    <motion.div
                        key={vacancy.id}
                        className="vacancy-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                    >
                        <div className="thumbnail">
                            <img 
                                src={vacancy.thumbnail || "https://placehold.co/400x225"} 
                                alt={vacancy.title} 
                            />
                            <div className="status-overlay">
                                <span className="status-badge">Actief</span>
                            </div>
                        </div>
                        <div className="vacancy-info">
                            <h3>{vacancy.title}</h3>
                            <div className="info-details">
                                <div className="info-item">
                                    <FaBuilding />
                                    <span>{vacancy.company}</span>
                                </div>
                                <div className="info-item">
                                    <FaMapMarkerAlt />
                                    <span>{vacancy.location || 'Locatie onbekend'}</span>
                                </div>
                                <div className="info-item">
                                    <FaCalendar />
                                    <span>{new Date(vacancy.created_at).toLocaleDateString('nl-NL', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VacancyDashboard; 