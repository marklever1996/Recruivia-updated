import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCopy, FaDownload } from 'react-icons/fa';
import './VacancyPreview.css';

const VacancyPreview = () => {
    const navigate = useNavigate();
    const [vacancyHtml, setVacancyHtml] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const html = localStorage.getItem('generatedVacancy');
        if (!html) {
            navigate('/create-vacancy');
            return;
        }
        setVacancyHtml(html);
    }, [navigate]);

    const handleCopy = () => {
        const textToCopy = document.createElement('div');
        textToCopy.innerHTML = vacancyHtml;
        navigator.clipboard.writeText(textToCopy.textContent);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([vacancyHtml], {type: 'text/html'});
        element.href = URL.createObjectURL(file);
        element.download = 'vacaturetekst.html';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="vacancy-preview-page">
            <div className="preview-container">
                <motion.div 
                    className="preview-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <button 
                        className="back-button"
                        onClick={() => navigate('/create-vacancy')}
                    >
                        <FaArrowLeft /> Terug
                    </button>
                    <div className="preview-actions">
                        <button 
                            className={`action-button ${copySuccess ? 'success' : ''}`}
                            onClick={handleCopy}
                        >
                            <FaCopy /> {copySuccess ? 'Gekopieerd!' : 'Kopieer tekst'}
                        </button>
                        <button 
                            className="action-button"
                            onClick={handleDownload}
                        >
                            <FaDownload /> Download HTML
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    className="preview-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: vacancyHtml }}
                />
            </div>
        </div>
    );
};

export default VacancyPreview; 