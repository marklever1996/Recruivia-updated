import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import '../styles/VacatureGenerator.css';

const VacatureGenerator = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [formData, setFormData] = useState({
        functie: '',
        organisatie: '',
        salaris: '',
        secundaire_arbeidsvoorwaarden: '',
        specifieke_taken: '',
        soft_skills: '',
        hard_skills: '',
        organisatie_cultuur: '',
        collegas: '',
        geschiedenis: '',
        sector: '',
        kernactiviteit: '',
        doelen: '',
        missie_visie_kernwaarden: '',
        maatschappelijke_bijdrage: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/generate-vacancy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Er ging iets mis bij het genereren van de vacature');
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            const formattedText = data.vacatureText.replace(/\n/g, '<br>');
            setGeneratedText(formattedText);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        const textToCopy = generatedText.replace(/<br>/g, '\n');
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Optioneel: toon een success message
                alert('Vacaturetekst gekopieerd!');
            })
            .catch(err => {
                console.error('Fout bij kopiëren:', err);
            });
    };

    return (
        <div className="generator-container">
            <div className="generator-content">
                <motion.div className="form-section">
                    <h2>Vacaturetekst Genereren</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="functie">Functie *</label>
                            <input
                                type="text"
                                id="functie"
                                name="functie"
                                value={formData.functie}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="organisatie">Organisatie *</label>
                            <input
                                type="text"
                                id="organisatie"
                                name="organisatie"
                                value={formData.organisatie}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salaris">Salaris *</label>
                            <input
                                type="text"
                                id="salaris"
                                name="salaris"
                                value={formData.salaris}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="secundaire_arbeidsvoorwaarden">
                                Secundaire Arbeidsvoorwaarden
                            </label>
                            <textarea
                                id="secundaire_arbeidsvoorwaarden"
                                name="secundaire_arbeidsvoorwaarden"
                                value={formData.secundaire_arbeidsvoorwaarden}
                                onChange={handleInputChange}
                                placeholder="Bijvoorbeeld: pensioenregeling, thuiswerkmogelijkheden, opleidingsmogelijkheden, etc."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="specifieke_taken">Specifieke Taken *</label>
                            <textarea
                                id="specifieke_taken"
                                name="specifieke_taken"
                                value={formData.specifieke_taken}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="soft_skills">Soft Skills</label>
                            <textarea
                                id="soft_skills"
                                name="soft_skills"
                                value={formData.soft_skills}
                                onChange={handleInputChange}
                                placeholder="Communicatief vaardig, analytisch, etc."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hard_skills">Hard Skills *</label>
                            <textarea
                                id="hard_skills"
                                name="hard_skills"
                                value={formData.hard_skills}
                                onChange={handleInputChange}
                                placeholder="Opleiding, ervaring, etc."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="organisatie_cultuur">Organisatie Cultuur</label>
                            <textarea
                                id="organisatie_cultuur"
                                name="organisatie_cultuur"
                                value={formData.organisatie_cultuur}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="collegas">Collega's</label>
                            <textarea
                                id="collegas"
                                name="collegas"
                                value={formData.collegas}
                                onChange={handleInputChange}
                                placeholder="Beschrijf het team waarin de kandidaat komt te werken"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="geschiedenis">Geschiedenis</label>
                            <textarea
                                id="geschiedenis"
                                name="geschiedenis"
                                value={formData.geschiedenis}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sector">Sector *</label>
                            <textarea
                                id="sector"
                                name="sector"
                                value={formData.sector}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="kernactiviteit">Kernactiviteit *</label>
                            <textarea
                                id="kernactiviteit"
                                name="kernactiviteit"
                                value={formData.kernactiviteit}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="doelen">Strategische Doelen</label>
                            <textarea
                                id="doelen"
                                name="doelen"
                                value={formData.doelen}
                                onChange={handleInputChange}
                                placeholder="Wat zijn de belangrijkste doelen van de organisatie?"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="missie_visie_kernwaarden">Missie, Visie & Kernwaarden</label>
                            <textarea
                                id="missie_visie_kernwaarden"
                                name="missie_visie_kernwaarden"
                                value={formData.missie_visie_kernwaarden}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maatschappelijke_bijdrage">Maatschappelijke Bijdrage</label>
                            <textarea
                                id="maatschappelijke_bijdrage"
                                name="maatschappelijke_bijdrage"
                                value={formData.maatschappelijke_bijdrage}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="generate-btn"
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <FaSpinner className="spinner" />
                                    Genereren...
                                </>
                            ) : (
                                'Genereer Vacature'
                            )}
                        </button>
                    </form>
                </motion.div>

                <motion.div 
                    className="preview-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2>Gegenereerde Vacaturetekst</h2>
                    <div className="preview-content">
                        {isGenerating ? (
                            <div className="loading-state">
                                <FaSpinner className="spinner" />
                                <p>Vacature wordt gegenereerd...</p>
                            </div>
                        ) : generatedText ? (
                            <div 
                                className="generated-text"
                                contentEditable
                                suppressContentEditableWarning
                                dangerouslySetInnerHTML={{ __html: generatedText }}
                            />
                        ) : (
                            <div className="empty-state">
                                <p>Vul het formulier in en klik op 'Genereer Vacature' om een AI-gegenereerde vacaturetekst te krijgen.</p>
                            </div>
                        )}
                    </div>
                    {generatedText && (
                        <div className="preview-actions">
                            <button className="save-btn">Opslaan</button>
                            <button className="copy-btn" onClick={handleCopy}>Kopiëren</button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default VacatureGenerator; 