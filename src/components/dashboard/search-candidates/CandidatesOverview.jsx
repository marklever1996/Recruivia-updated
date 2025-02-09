import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaMapMarkerAlt, FaBriefcase, FaClock, FaEnvelope, FaUserPlus, FaFileAlt, FaStar, FaChevronRight, FaDownload, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CandidatesOverview.css';

const CandidatesOverview = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showCvModal, setShowCvModal] = useState(false);
    const [selectedCv, setSelectedCv] = useState(null);
    const [isLoadingCv, setIsLoadingCv] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/candidates');
                if (!response.ok) {
                    throw new Error('Failed to fetch candidates');
                }
                const data = await response.json();
                
                const formattedCandidates = data.map(candidate => ({
                    id: candidate.id,
                    name: candidate.name,
                    title: candidate.experience?.[0]?.position || 'Geen titel',
                    location: candidate.location,
                    experience: `${candidate.experience?.length || 0} jaar ervaring`,
                    skills: candidate.skills || [],
                    status: 'Beschikbaar',
                    lastActive: new Date(candidate.created_at).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                }));
                
                setCandidates(formattedCandidates);
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
        { id: 'saved', label: 'Opgeslagen' },
        {id: 'recent', label: 'Recente'},
        {id: 'filtered', label: 'Gefilterd'}
    ];

    const handleAddCandidate = () => {
        navigate('/add-candidate');
    };

    const handleViewCv = async (candidateId) => {
        try {
            setIsLoadingCv(true);
            setShowCvModal(true);
            setError(null);
            
            console.log('Ophalen CV voor kandidaat:', candidateId);
            const response = await fetch(`http://localhost:8000/api/candidates/${candidateId}/cv`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Kon CV niet laden');
            }
            
            // Check of we daadwerkelijk een PDF krijgen
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/pdf')) {
                console.error('Onverwacht content type:', contentType);
                throw new Error('Server stuurde geen PDF bestand');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log('PDF URL gemaakt:', url);
            setSelectedCv(url);
            
        } catch (error) {
            console.error('Error loading CV:', error);
            setError('Kon CV niet laden: ' + error.message);
        } finally {
            setIsLoadingCv(false);
        }
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
                        whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}
                    >
                        <div className="candidate-main-info">

                            <div className="candidate-details">
                                <div className="name-and-actions">
                                    <h3>{candidate.name}</h3>
                                    <div className="quick-actions">
                                        <button className="action-button" title="Contact opnemen">
                                            <FaEnvelope />
                                        </button>
                                        <button 
                                            className="action-button" 
                                            title="CV bekijken"
                                            onClick={() => handleViewCv(candidate.id)}
                                        >
                                            <FaFileAlt />
                                        </button>
                                        <button className="action-button" title="Toevoegen aan shortlist">
                                            <FaStar />
                                        </button>
                                    </div>
                                </div>

                                <div className="candidate-meta">
                                    <div className="meta-group">
                                        <span className="meta-item">
                                            <FaBriefcase />
                                            <span className="meta-text">{candidate.title}</span>
                                        </span>
                                        <span className="meta-item">
                                            <FaMapMarkerAlt />
                                            <span className="meta-text">{candidate.location}</span>
                                        </span>
                                        <span className="meta-item">
                                            <FaClock />
                                            <span className="meta-text">{candidate.experience}</span>
                                        </span>
                                    </div>
                                    <span className={`status-badge ${candidate.status.toLowerCase().replace(' ', '-')}`}>
                                        {candidate.status}
                                    </span>
                                </div>

                                <div className="candidate-skills">
                                    <div className="skills-list">
                                        {candidate.skills.slice(0, 4).map((skill, i) => (
                                            <span key={i} className="skill-tag">
                                                {skill}
                                            </span>
                                        ))}
                                        {candidate.skills.length > 4 && (
                                            <span className="skill-tag more">
                                                +{candidate.skills.length - 4}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="candidate-footer">
                                    <button className="view-profile-btn">
                                        Bekijk Profiel
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showCvModal && (
                <div className="cv-modal-overlay">
                    <div className="cv-modal">
                        <div className="cv-actions">
                            <button 
                                className="cv-action-button"
                                onClick={() => window.open(selectedCv, '_blank')}
                                title="Download CV"
                            >
                                <FaDownload />
                            </button>
                            <button 
                                className="cv-action-button"
                                onClick={() => {
                                    setShowCvModal(false);
                                    setSelectedCv(null);
                                }}
                                title="Sluiten"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="cv-content">
                            {isLoadingCv ? (
                                <div className="cv-loading">
                                    <div className="spinner"></div>
                                    <p>CV laden...</p>
                                </div>
                            ) : (
                                <iframe 
                                    src={`${selectedCv}#toolbar=0`} 
                                    title="CV Viewer"
                                    width="100%"
                                    height="100%"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidatesOverview;
