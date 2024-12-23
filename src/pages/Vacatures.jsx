import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Vacatures.css';

const Vacatures = () => {
    const navigate = useNavigate();
    const [vacatures, setVacatures] = useState([
        {
            id: 1,
            titel: "Senior React Developer",
            bedrijf: "TechCorp BV",
            locatie: "Amsterdam",
            type: "Fulltime",
            niveau: "Senior",
            datum: "2024-03-15",
            status: "Actief"
        },
        {
            id: 2,
            titel: "UX/UI Designer",
            bedrijf: "DesignStudio",
            locatie: "Rotterdam",
            type: "Fulltime",
            niveau: "Medior",
            datum: "2024-03-14",
            status: "Actief"
        }
    ]);

    const handleNewVacancy = () => {
        navigate('/vacatures/generator');
    };

    return (
        <div className="vacatures-container">
            {/* Header sectie */}
            <motion.div 
                className="vacatures-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Vacatures</h1>
                <button className="new-vacancy-btn" onClick={handleNewVacancy}>
                    <FaPlus /> Nieuwe Vacature
                </button>
            </motion.div>

            {/* Zoek en filter sectie */}
            <motion.div 
                className="search-filter-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="search-box">
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Zoek vacatures..." 
                    />
                </div>
                <button className="filter-btn">
                    <FaFilter /> Filter
                </button>
            </motion.div>

            {/* Vacatures lijst */}
            <motion.div 
                className="vacatures-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {vacatures.map((vacature) => (
                    <motion.div 
                        key={vacature.id}
                        className="vacature-card"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="vacature-header">
                            <h3>{vacature.titel}</h3>
                            <span className={`status ${vacature.status.toLowerCase()}`}>
                                {vacature.status}
                            </span>
                        </div>
                        <div className="vacature-info">
                            <p><strong>Bedrijf:</strong> {vacature.bedrijf}</p>
                            <p><strong>Locatie:</strong> {vacature.locatie}</p>
                            <p><strong>Type:</strong> {vacature.type}</p>
                            <p><strong>Niveau:</strong> {vacature.niveau}</p>
                            <p><strong>Geplaatst:</strong> {new Date(vacature.datum).toLocaleDateString()}</p>
                        </div>
                        <div className="vacature-actions">
                            <button className="edit-btn">Bewerken</button>
                            <button className="view-btn">Bekijken</button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Vacatures; 