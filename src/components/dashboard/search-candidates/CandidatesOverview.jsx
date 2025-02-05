import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaMapMarkerAlt, FaBriefcase, FaClock, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CandidatesOverview.css';

const CandidatesOverview = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/candidates');
                if (!response.ok) {
                    throw new Error('Failed to fetch candidates');
                }
                const data = await response.json();
                setCandidates(data);
            } catch (err) {
                setError('Error loading candidates: ' + err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const filters = [
        { id: 'all', label: 'Alle kandidaten' },
        { id: 'available', label: 'Beschikbaar' },
        { id: 'new', label: 'Nieuw' },
        { id: 'saved', label: 'Opgeslagen' }
    ];

    const handleAddCandidate = () => {
        navigate('/add-candidate'); // Deze route moet je nog toevoegen
    };

    return (
        <div className="candidates-overview">
            <div className="overview-header">
                <div className="header-content">
                    <div className="filters-row">
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                className={`filter-button ${selectedFilter === filter.id ? 'active' : ''}`}
                                onClick={() => setSelectedFilter(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                    <button className="add-candidate-button" onClick={handleAddCandidate}>
                        <FaUserPlus />
                        <span>Nieuwe Kandidaat</span>
                    </button>
                </div>
            </div>

            <div className="candidates-list">
                {candidates.map((candidate, index) => (
                    <motion.div
                        key={candidate.id}
                        className="candidate-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="candidate-main-info">
                            <div className="candidate-photo">
                                {candidate.photo ? (
                                    <img src={candidate.photo} alt={candidate.name} />
                                ) : (
                                    <FaUserCircle />
                                )}
                            </div>
                            <div className="candidate-details">
                                <h3>{candidate.name}</h3>
                                <div className="candidate-meta">
                                    <span className="meta-item">
                                        <FaBriefcase />
                                        {candidate.title}
                                    </span>
                                    <span className="meta-item">
                                        <FaMapMarkerAlt />
                                        {candidate.location}
                                    </span>
                                    <span className="meta-item">
                                        <FaClock />
                                        {candidate.experience}
                                    </span>
                                </div>
                                <div className="skills-list">
                                    {candidate.skills.map((skill, i) => (
                                        <span key={i} className="skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="candidate-actions">
                            <span className={`status-badge ${candidate.status.toLowerCase().replace(' ', '-')}`}>
                                {candidate.status}
                            </span>
                            <button className="action-button contact">
                                <FaEnvelope />
                                Contact
                            </button>
                            <span className="last-active">
                                Laatst actief: {candidate.lastActive}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CandidatesOverview;
