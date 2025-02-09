import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaSpinner, FaFileAlt, FaCheck, FaPercentage } from 'react-icons/fa';
import './MatchAnalysis.css';


const MatchAnalysis = () => {
    const [selectedVacancy, setSelectedVacancy] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                // Fetch vacancies from the backend (Symfony API)
                const response = await fetch('http://localhost:8000/api/vacancies');
                if (!response.ok) {
                    throw new Error('Failed to fetch vacancies');
                }
                const data = await response.json();
                setVacancies(data);
            } catch (err) {
                setError('Error loading vacancies: ' + err.message);
            }
        };

        fetchVacancies();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError(null);
        } else{
            setError('Upload alstublieft een PDF bestand');
            setSelectedFile(null);
        }
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!selectedVacancy || !selectedFile) {
            setError('Selecteer een vacature en upload een CV');
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('cv', selectedFile);
            formData.append('vacancy_id', selectedVacancy);

            // Analyseer match met AI API, backend/ai_api/app.py
            const response = await fetch('http://127.0.0.1:5000/api/analyze-match', {
                method: 'POST',
                body: formData
            });


            if (!response.ok) {
                throw new Error('Er ging iets mis bij het analyseren van het CV');
            }

            const data = await response.json();
            setAnalysisResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="match-analysis">
            <div className={`analysis-container ${analysisResult ? 'has-results' : ''}`}>
                <motion.div 
                    className="analysis-form-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="section-header">
                        <h1>CV Match Analyse</h1>
                        <p>Upload een CV en selecteer een vacature om de match te analyseren</p>
                    </div>

                    <form onSubmit={handleAnalyze} className="analysis-form">
                        <div className="form-group">
                            <label htmlFor="vacancy">Selecteer Vacature</label>
                            <select
                                id="vacancy"
                                value={selectedVacancy}
                                onChange={(e) => setSelectedVacancy(e.target.value)}
                                required
                            >
                                <option value="">Kies een vacature...</option>
                                {vacancies.map(vacancy => (
                                    <option key={vacancy.id} value={vacancy.id}>
                                        {vacancy.title}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div className="file-upload-section">
                            <label className="file-upload-label">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="file-input"
                                />
                                <div className="upload-content">
                                    {selectedFile ? (
                                        <>
                                            <FaFileAlt className="file-icon" />
                                            <span>{selectedFile.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUpload className="upload-icon" />
                                            <span>Upload CV (PDF)</span>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="analyze-button"
                            disabled={isAnalyzing || !selectedFile || !selectedVacancy}
                        >
                            {isAnalyzing ? (
                                <>
                                    <FaSpinner className="spinner" />
                                    Analyseren...
                                </>
                            ) : (
                                <>
                                    <FaCheck />
                                    Analyseer Match
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {analysisResult && (
                    <motion.div 
                        className="analysis-result"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2>Analyse Resultaten</h2>
                        <div className="match-score">
                            <div className="score-circle">
                                <span>{analysisResult.match_percentage}%</span>
                            </div>
                            <p>Match Score</p>
                        </div>

                        <div className="match-details">
                            <h3>Matchende Vaardigheden</h3>
                            <ul className="skills-list">
                                {analysisResult.matching_skills?.map((skill, index) => (
                                    <li key={index} className="skill-match">
                                        <FaCheck /> {skill}
                                    </li>
                                ))}
                            </ul>

                            <h3>Ontbrekende Vaardigheden</h3>
                            <ul className="skills-list">
                                {analysisResult.missing_skills?.map((skill, index) => (
                                    <li key={index} className="skill-missing">
                                        {skill}
                                    </li>
                                ))}
                            </ul>

                            <div className="recommendations">
                                <h3>Recruitment Advies</h3>
                                
                                <div className="recommendation-section">
                                    <h4>Algemene Analyse</h4>
                                    <p>{analysisResult.recommendations.algemene_analyse}</p>
                                </div>

                                <div className="recommendation-section">
                                    <h4>Vervolgstappen</h4>
                                    <ol className="steps-list">
                                        {analysisResult.recommendations.vervolgstappen.map((stap, index) => (
                                            <li key={index}>{stap}</li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="recommendation-section">
                                    <h4>Interview Vragen</h4>
                                    <ul className="questions-list">
                                        {analysisResult.recommendations.interview_vragen.map((vraag, index) => (
                                            <li key={index}>{vraag}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="recommendation-section">
                                    <h4>Ontwikkelpunten</h4>
                                    <ul className="points-list">
                                        {analysisResult.recommendations.ontwikkelpunten.map((punt, index) => (
                                            <li key={index}>{punt}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="recommendation-section">
                                    <h4>Aandachtspunten</h4>
                                    <ul className="points-list attention">
                                        {analysisResult.recommendations.aandachtspunten.map((punt, index) => (
                                            <li key={index}>{punt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MatchAnalysis; 