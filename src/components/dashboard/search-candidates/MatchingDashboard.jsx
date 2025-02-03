import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaRegStar, FaFilter, FaUserCircle, FaChevronDown, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MatchingDashboard.css';

const MatchingDashboard = () => {
    const navigate = useNavigate();
    const [selectedVacancy, setSelectedVacancy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [sortBy, setSortBy] = useState('match');

    // Voorbeeld vacatures (later te vervangen door API call)
    const vacatures = [
        {
            id: 1,
            title: 'Senior React Developer',
            department: 'Engineering',
            location: 'Amsterdam',
            requirements: [
                'React', 'TypeScript', 'Node.js',
                'AWS', 'CI/CD', 'Agile'
            ]
        },
        {
            id: 2,
            title: 'Frontend Developer',
            department: 'Product',
            location: 'Utrecht',
            requirements: [
                'React', 'Vue.js', 'JavaScript',
                'CSS3', 'UI/UX', 'Responsive Design'
            ]
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            department: 'Engineering',
            location: 'Rotterdam',
            requirements: [
                'React', 'Node.js', 'MongoDB',
                'Docker', 'Microservices', 'AWS'
            ]
        }
    ];

    // Voorbeeld kandidaten data (later te vervangen door API calls)
    const candidates = [
        {
            id: 1,
            name: "Sarah Johnson",
            title: "Senior React Developer",
            location: "Amsterdam",
            matchScore: 95,
            skills: ["React", "TypeScript", "Node.js", "AWS"],
            experience: "8 jaar",
            matchingPoints: [
                "95% match met technische vaardigheden",
                "Vergelijkbare rol bij soortgelijk bedrijf",
                "8+ jaar relevante ervaring in React development"
            ],
            status: "Open voor nieuwe kansen",
            lastActive: "2 dagen geleden",
            photo: null
        },
        {
            id: 2,
            name: "Michael Chen",
            title: "Frontend Developer",
            location: "Utrecht",
            matchScore: 87,
            skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
            experience: "5 jaar",
            matchingPoints: [
                "87% match met vereiste technische stack",
                "Ervaring met moderne React frameworks",
                "Actieve bijdragen aan open source projecten"
            ],
            status: "Actief zoekend",
            lastActive: "Vandaag",
            highlighted: ["Sterk in moderne frontend frameworks", "Open source contributor"],
            photo: null
        },
        {
            id: 3,
            name: "Emma van der Berg",
            title: "Full Stack Developer",
            location: "Amsterdam",
            matchScore: 82,
            skills: ["React", "Node.js", "MongoDB", "Docker"],
            experience: "6 jaar",
            matchingPoints: [
                "Sterke backend ervaring met Node.js",
                "Ervaring met microservices architectuur",
                "Leidinggevende rol in agile teams"
            ],
            status: "Actief zoekend",
            lastActive: "1 week geleden",
            photo: null
        },
        {
            id: 4,
            name: "David Wilson",
            title: "React Native Developer",
            location: "Rotterdam",
            matchScore: 78,
            skills: ["React", "React Native", "TypeScript", "Redux"],
            experience: "4 jaar",
            matchingPoints: [
                "Uitgebreide ervaring met React ecosysteem",
                "Sterke focus op mobile development",
                "Bekend met moderne state management"
            ],
            status: "Actief zoekend",
            lastActive: "3 dagen geleden",
            photo: null
        }
    ];

    const filters = [
        { id: 'experience', label: 'Ervaring', options: ['3-5 jaar', '5-8 jaar', '8+ jaar'] },
        { id: 'location', label: 'Regio', options: ['Amsterdam', 'Utrecht', 'Rotterdam'] },
        { id: 'skills', label: 'Kernvaardigheden', options: ['React', 'TypeScript', 'Node.js'] },
    ];

    const handleFilterChange = (filterId, value) => {
        setSelectedFilters(prev => {
            const newFilters = [...prev];
            const existingIndex = newFilters.findIndex(f => f.id === filterId);
            
            if (existingIndex >= 0) {
                newFilters[existingIndex] = { id: filterId, value };
            } else {
                newFilters.push({ id: filterId, value });
            }
            
            return newFilters;
        });
    };

    const handleCreateVacancy = () => {
        navigate('/create-vacancy');
    };

    return (
        <div className="matching-dashboard">
            <div className="controls-container">
                <div className="top-controls">
                    <div className="vacancy-selector">
                        <select 
                            value={selectedVacancy}
                            onChange={(e) => setSelectedVacancy(e.target.value)}
                            className="vacancy-select"
                        >
                            <option value="">Selecteer een vacature</option>
                            {vacatures.map(vacature => (
                                <option key={vacature.id} value={vacature.id}>
                                    {vacature.title} - {vacature.department}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="search-controls">
                        <div className="search-field">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Zoek binnen resultaten..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="filter-button">
                            <FaFilter />
                            <span>Filters</span>
                            <FaChevronDown className="chevron-icon" />
                        </button>
                        <select 
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="match">Match Score ↓</option>
                            <option value="recent">Recent Actief</option>
                            <option value="experience">Ervaring</option>
                        </select>
                    </div>
                </div>
            </div>

            {!selectedVacancy ? (
                <motion.div 
                    className="no-vacancy-selected"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="empty-state">
                        <div className="empty-state-content">
                            <h2>Selecteer een vacature</h2>
                            <p>
                                Kies een bestaande vacature om kandidaten te matchen, 
                                of <button 
                                    className="inline-link"
                                    onClick={handleCreateVacancy}
                                >
                                    maak een nieuwe vacature aan
                                </button> als je nog geen passende vacature hebt.
                            </p>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="candidates-grid">
                    {candidates.map((candidate, index) => (
                        <motion.div 
                            key={candidate.id}
                            className="candidate-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="candidate-header">
                                <div className="candidate-info">
                                    {candidate.photo ? (
                                        <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
                                    ) : (
                                        <FaUserCircle className="candidate-photo-placeholder" />
                                    )}
                                    <div className="candidate-details">
                                        <h3>{candidate.name}</h3>
                                        <p className="candidate-title">{candidate.title}</p>
                                        <p className="candidate-location">{candidate.location}</p>
                                    </div>
                                </div>
                                <div className="match-score">
                                    {candidate.matchScore}%
                                </div>
                            </div>

                            <div className="matching-points">
                                <h4>Match details</h4>
                                <ul>
                                    {candidate.matchingPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="skills-section">
                                {candidate.skills.map((skill, i) => (
                                    <span key={i} className="skill-tag">{skill}</span>
                                ))}
                            </div>

                            <div className="candidate-footer">
                                <div className="candidate-actions">
                                    <button className="action-button primary">Contact opnemen</button>
                                    <button className="action-button secondary">
                                        <FaRegStar />
                                    </button>
                                </div>
                                <span className="last-active">Laatst actief: {candidate.lastActive}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchingDashboard; 