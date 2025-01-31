import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaSpinner, FaFileAlt, FaCheck, FaPercentage } from 'react-icons/fa';
import './MatchAnalysis.css';

const MatchAnalysis = () => {
    const [selectedVacancy, setSelectedVacancy] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    // Voorbeeld vacatures (later te vervangen door echte data)
    const vacatures = [
        { id: 1, title: 'Senior React Developer' },
        { id: 2, title: 'UX Designer' },
        { id: 3, title: 'Product Manager' },
    ];

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError(null);
        } else {
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

            const response = await fetch('http://localhost:5000/api/analyze-match', {
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
            <div className="analysis-container">
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
                                {vacatures.map(vacature => (
                                    <option key={vacature.id} value={vacature.id}>
                                        {vacature.title}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h2>Analyse Resultaten</h2>
                        <div className="match-score">
                            <div className="score-circle">
                                <FaPercentage />
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
                                <h3>Aanbevelingen</h3>
                                <p>{analysisResult.recommendations}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MatchAnalysis; 