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
            console.log('Ontvangen vacatures:', data);
            setVacancies(data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
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

    if (error) {
        return (
            <div className="vacancy-dashboard error">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="vacancy-dashboard">
            <div className="dashboard-content">
                <div className="vacancies-grid">
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

                    {vacancies.map((vacancy) => {
                        console.log('Vacancy data:', vacancy);
                        return (
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VacancyDashboard; 