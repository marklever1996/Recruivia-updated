import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaBuilding, FaCalendarAlt, FaEuroSign, FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import './VacancyDashboard.css';

const VacancyDashboard = () => {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/vacancies');
            if (!response.ok) {
                throw new Error('Er ging iets mis bij het ophalen van de vacatures');
            }
            const data = await response.json();
            setVacancies(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error:', err);
            setVacancies([]); // Zet vacatures naar lege array bij error
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="vacancy-dashboard loading">
                <div className="loader">Laden...</div>
            </div>
        );
    }

    return (
        <div className="vacancy-dashboard">
            <div className="dashboard-content">
                <div className="vacancies-grid">
                    {vacancies.length === 0 ? (
                        // Alleen de nieuwe vacature kaart als er geen vacatures zijn
                        <motion.div
                            className="vacancy-card new-vacancy-card solo"
                            onClick={() => navigate('/create-vacancy')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="new-vacancy-content">
                                <FaPlus className="plus-icon" />
                                <p>Nieuwe Vacature</p>
                                <span className="helper-text">
                                    Start met het maken van je eerste vacature
                                </span>
                            </div>
                        </motion.div>
                    ) : (
                        // Als er wel vacatures zijn, toon dan alles
                        <>
                            <motion.div
                                className="vacancy-card new-vacancy-card"
                                onClick={() => navigate('/create-vacancy')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="new-vacancy-content">
                                    <FaPlus className="plus-icon" />
                                    <p>Nieuwe Vacature</p>
                                </div>
                            </motion.div>

                            {vacancies.map((vacancy) => (
                                <motion.div
                                    key={vacancy.id}
                                    className="vacancy-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="vacancy-header">
                                        <h2>{vacancy.title}</h2>
                                        <div className="company">
                                            <FaBuilding />
                                            <span>{vacancy.company}</span>
                                        </div>
                                        <div className="extra-info">
                                            {vacancy.location}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                                        className="view-button"
                                    >
                                        Bekijk Details
                                    </button>
                                </motion.div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VacancyDashboard; 