import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCopy, FaDownload, FaEllipsisH, FaPrint, FaShare, FaSave } from 'react-icons/fa';
import './VacancyPreview.css';

const VacancyPreview = () => {
    const navigate = useNavigate();
    const [vacancyHtml, setVacancyHtml] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [showToolbar, setShowToolbar] = useState(true);

    useEffect(() => {
        const html = localStorage.getItem('generatedVacancy');
        if (!html) {
            navigate('/create-vacancy');
            return;
        }
        setVacancyHtml(html);

        // Hide toolbar on scroll
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowToolbar(false);
            } else {
                setShowToolbar(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="vacancy-preview-page">
            <motion.div 
                className={`preview-toolbar ${showToolbar ? 'visible' : 'hidden'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <div className="toolbar-left">
                    <button 
                        className="toolbar-button"
                        onClick={() => navigate('/create-vacancy')}
                    >
                        <FaArrowLeft /> <span>Terug</span>
                    </button>
                    <div className="document-title">
                        <h1>Vacaturetekst</h1>
                        <span className="save-status">Automatisch opgeslagen</span>
                    </div>
                </div>

                <div className="toolbar-actions">
                    <button 
                        className={`toolbar-button ${copySuccess ? 'success' : ''}`}
                        onClick={handleCopy}
                        title="Kopieer naar klembord"
                    >
                        <FaCopy />
                        <span>{copySuccess ? 'Gekopieerd!' : 'Kopiëren'}</span>
                    </button>
                    <button 
                        className="toolbar-button"
                        onClick={handleDownload}
                        title="Download als HTML"
                    >
                        <FaDownload />
                        <span>Downloaden</span>
                    </button>
                    <button 
                        className="toolbar-button"
                        onClick={handlePrint}
                        title="Print document"
                    >
                        <FaPrint />
                        <span>Afdrukken</span>
                    </button>
                    <button 
                        className="toolbar-button"
                        title="Delen"
                    >
                        <FaShare />
                        <span>Delen</span>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button className="toolbar-button">
                        <FaEllipsisH />
                    </button>
                </div>
            </motion.div>

            <motion.div 
                className="document-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="document-page">
                    <div 
                        className="document-content"
                        dangerouslySetInnerHTML={{ __html: vacancyHtml }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default VacancyPreview; 