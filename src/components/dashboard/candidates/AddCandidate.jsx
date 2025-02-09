import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaSpinner, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AddCandidate.css';

const AddCandidate = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        try {
            // Stap 1: Upload CV bestand
            const formData = new FormData();
            formData.append('cv', selectedFile);
            
            // Upload CV naar PHP backend
            const uploadResponse = await fetch('http://localhost:8000/api/candidates/upload-cv', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                throw new Error('Kon CV niet uploaden');
            }

            const uploadResult = await uploadResponse.json();
            
            // Stap 2: CV Analyse met Python/AI
            const aiResponse = await fetch('http://localhost:5000/api/parse-cv', {
                method: 'POST',
                body: formData
            });

            const cvData = await aiResponse.json();
            
            if (cvData.error) {
                throw new Error(cvData.error);
            }

            // Voeg CV bestandsnaam toe aan de data
            cvData.cv_filename = uploadResult.filename;

            // Stap 3: Opslaan in Database
            const response = await fetch('http://localhost:8000/api/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cvData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Er ging iets mis bij het opslaan van de kandidaat');
            }

            const data = await response.json();
            
            // Navigeer terug naar dashboard
            navigate('/dashboard-candidates', { 
                state: { 
                    newCandidateId: data.id,
                    refreshCandidates: true 
                }
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="add-candidate">
            <motion.div 
                className="upload-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="section-header">
                    <h1>Nieuwe Kandidaat Toevoegen</h1>
                    <p>Upload het CV van de kandidaat om automatisch een profiel aan te maken</p>
                </div>

                <form onSubmit={handleSubmit} className="upload-form">
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
                                        <p className="upload-hint">
                                            Sleep het bestand hierheen of klik om te uploaden
                                        </p>
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
                        className="submit-button"
                        disabled={isUploading || !selectedFile}
                    >
                        {isUploading ? (
                            <>
                                <FaSpinner className="spinner" />
                                Profiel aanmaken...
                            </>
                        ) : (
                            <>
                                <FaCheck />
                                Maak Profiel Aan
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddCandidate; 