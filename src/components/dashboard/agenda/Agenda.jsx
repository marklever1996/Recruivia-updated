import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { FaGoogle, FaCalendarAlt, FaSync, FaClock, FaMapMarkerAlt, FaUser, FaChevronRight } from 'react-icons/fa';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import './Agenda.css';

const Agenda = () => {
    const [events, setEvents] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Google Calendar integratie
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setIsLoading(true);
                // Stuur token naar backend voor verificatie en opslag
                const response = await fetch('http://localhost:8000/api/calendar/connect', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        access_token: tokenResponse.access_token
                    })
                });

                if (response.ok) {
                    setIsConnected(true);
                    fetchEvents();
                }
            } catch (error) {
                setError('Kon geen verbinding maken met Google Calendar');
            } finally {
                setIsLoading(false);
            }
        },
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
    });

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8000/api/calendar/events');
            if (response.ok) {
                const data = await response.json();
                setEvents(data.events);
            }
        } catch (error) {
            setError('Kon agenda items niet ophalen');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Check of gebruiker al verbonden is
        const checkConnection = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/calendar/status');
                if (response.ok) {
                    const { connected } = await response.json();
                    setIsConnected(connected);
                    if (connected) {
                        fetchEvents();
                    }
                }
            } catch (error) {
                console.error('Kon verbindingsstatus niet controleren:', error);
            }
        };

        checkConnection();
    }, []);

    if (isLoading) {
        return (
            <div className="agenda-dashboard">
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <p>Agenda laden...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="agenda-dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Agenda Overzicht</h1>
                    {!isConnected ? (
                        <motion.button 
                            className="connect-calendar-btn"
                            onClick={() => login()}
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaGoogle />
                            <span>Verbind met Google Calendar</span>
                        </motion.button>
                    ) : (
                        <motion.button 
                            className="refresh-btn"
                            onClick={fetchEvents}
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaSync className={isLoading ? 'spinning' : ''} />
                            <span>Ververs Agenda</span>
                        </motion.button>
                    )}
                </div>

                {error && (
                    <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {error}
                    </motion.div>
                )}
            </div>

            <div className="dashboard-content">
                <div className="calendar-grid">
                    <motion.div
                        className="calendar-card current-date-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="date-content">
                            <div className="date-icon">
                                <FaCalendarAlt />
                            </div>
                            <div className="date-details">
                                <h3>Vandaag</h3>
                                <p>{format(selectedDate, 'PPPP', { locale: nl })}</p>
                            </div>
                        </div>
                    </motion.div>

                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                className="calendar-card event-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="event-content">
                                    <div className="event-header">
                                        <h3>{event.title}</h3>
                                        <span className="status-badge">Gepland</span>
                                    </div>
                                    
                                    <div className="event-info">
                                        <div className="info-item">
                                            <FaClock />
                                            <span>{new Date(event.start).toLocaleTimeString('nl-NL', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        </div>
                                        {event.location && (
                                            <div className="info-item">
                                                <FaMapMarkerAlt />
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                        {event.attendees && (
                                            <div className="info-item">
                                                <FaUser />
                                                <span>{event.attendees.length} deelnemers</span>
                                            </div>
                                        )}
                                    </div>

                                    <button className="view-button">
                                        <span>Details</span>
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            className="no-events-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="no-events-content">
                                <FaCalendarAlt />
                                <h3>Geen Geplande Gesprekken</h3>
                                <p>{isConnected ? 
                                    'Er zijn geen gesprekken gepland voor vandaag.' : 
                                    'Verbind je Google Calendar om je gesprekken te zien.'}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Agenda; 