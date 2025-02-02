import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLightbulb, FaSpinner, FaBuilding, FaBriefcase, FaUsers, FaChartLine, FaHandshake } from 'react-icons/fa';
import './CreateVacancy.css';

const CreateVacancy = () => {
    const navigate = useNavigate();
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
    
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVacancy, setGeneratedVacancy] = useState('');
    const [error, setError] = useState(null);

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
        setError(null);
        
        try {
            // Eerst: Genereer vacaturetekst met AI API
            const aiResponse = await fetch('http://localhost:5000/api/generate-vacancy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!aiResponse.ok) {
                const errorData = await aiResponse.json();
                throw new Error(errorData.error || 'Er ging iets mis bij het genereren van de vacaturetekst');
            }

            const aiData = await aiResponse.json();
            
            // Daarna: Sla de vacature op in Symfony backend
            const vacancyData = {
                title: formData.functie,
                company: formData.organisatie,
                salary: formData.salaris,
                description: aiData.html, // De gegenereerde vacaturetekst
                location: null
            };

            const symfonyResponse = await fetch('http://localhost:8000/api/vacancies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vacancyData)
            });

            if (!symfonyResponse.ok) {
                throw new Error('Er ging iets mis bij het opslaan van de vacature');
            }

            // Sla de gegenereerde vacature op in localStorage en navigeer
            localStorage.setItem('generatedVacancy', aiData.html);
            navigate('/vacancy-preview');

        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopyText = () => {
        const textToCopy = document.createElement('div');
        textToCopy.innerHTML = generatedVacancy;
        navigator.clipboard.writeText(textToCopy.textContent);
    };

    const formSections = [
        {
            title: "Functie Details",
            icon: <FaBriefcase />,
            fields: [
                {
                    name: "functie",
                    label: "Functietitel",
                    type: "text",
                    placeholder: "Bijv: Senior React Developer",
                    required: true
                },
                {
                    name: "salaris",
                    label: "Salarisindicatie",
                    type: "text",
                    placeholder: "Bijv: €3.500 - €5.000 per maand",
                    required: true
                },
                {
                    name: "specifieke_taken",
                    label: "Specifieke taken",
                    type: "textarea",
                    placeholder: "Beschrijf de belangrijkste taken en verantwoordelijkheden",
                    required: true,
                    fullWidth: true
                },
                {
                    name: "secundaire_arbeidsvoorwaarden",
                    label: "Secundaire arbeidsvoorwaarden",
                    type: "textarea",
                    placeholder: "Bijv: 25 vakantiedagen, thuiswerkmogelijkheden, etc.",
                    required: true,
                    fullWidth: true
                }
            ]
        },
        {
            title: "Kandidaat Profiel",
            icon: <FaUsers />,
            fields: [
                {
                    name: "soft_skills",
                    label: "Soft Skills",
                    type: "textarea",
                    placeholder: "Bijv: communicatief sterk, analytisch denkvermogen",
                    required: true
                },
                {
                    name: "hard_skills",
                    label: "Hard Skills",
                    type: "textarea",
                    placeholder: "Bijv: 5+ jaar React ervaring, TypeScript",
                    required: true
                }
            ]
        },
        {
            title: "Organisatie Informatie",
            icon: <FaBuilding />,
            fields: [
                {
                    name: "organisatie",
                    label: "Organisatienaam",
                    type: "text",
                    required: true
                },
                {
                    name: "sector",
                    label: "Sector",
                    type: "text",
                    required: true
                },
                {
                    name: "kernactiviteit",
                    label: "Kernactiviteit",
                    type: "textarea",
                    placeholder: "Waar houdt de organisatie zich mee bezig?",
                    required: true
                },
                {
                    name: "geschiedenis",
                    label: "Geschiedenis",
                    type: "textarea",
                    placeholder: "Korte geschiedenis van de organisatie",
                    required: true
                }
            ]
        },
        {
            title: "Team & Cultuur",
            icon: <FaHandshake />,
            fields: [
                {
                    name: "collegas",
                    label: "Team samenstelling",
                    type: "textarea",
                    placeholder: "Beschrijf het team waar de kandidaat in komt te werken",
                    required: true
                },
                {
                    name: "organisatie_cultuur",
                    label: "Organisatiecultuur",
                    type: "textarea",
                    placeholder: "Beschrijf de werksfeer en cultuur",
                    required: true
                }
            ]
        },
        {
            title: "Missie & Visie",
            icon: <FaChartLine />,
            fields: [
                {
                    name: "doelen",
                    label: "Strategische doelen",
                    type: "textarea",
                    placeholder: "Wat wil de organisatie bereiken?",
                    required: true
                },
                {
                    name: "missie_visie_kernwaarden",
                    label: "Missie, visie en kernwaarden",
                    type: "textarea",
                    placeholder: "Waar staat de organisatie voor?",
                    required: true
                },
                {
                    name: "maatschappelijke_bijdrage",
                    label: "Maatschappelijke bijdrage",
                    type: "textarea",
                    placeholder: "Hoe draagt deze functie bij aan de maatschappij?",
                    required: true
                }
            ]
        }
    ];

    return (
        <div className="create-vacancy">
            <div className="vacancy-container">
                <motion.div 
                    className="vacancy-form-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="section-header">
                        <h1>AI Vacaturetekst Generator</h1>
                        <p>Vul de details in en laat AI een professionele vacaturetekst genereren</p>
                    </div>

                    <form onSubmit={handleSubmit} className="vacancy-form">
                        {formSections.map((section, sectionIndex) => (
                            <motion.div 
                                key={section.title}
                                className="form-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: sectionIndex * 0.1 }}
                            >
                                <div className="section-title">
                                    {section.icon}
                                    <h2>{section.title}</h2>
                                </div>
                                <div className="form-grid">
                                    {section.fields.map((field) => (
                                        <div 
                                            key={field.name}
                                            className={`form-group ${field.fullWidth ? 'full-width' : ''}`}
                                        >
                                            <label htmlFor={field.name}>{field.label}</label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleInputChange}
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleInputChange}
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        <button 
                            type="submit" 
                            className="generate-button"
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <FaSpinner className="spinner" />
                                    Vacaturetekst genereren...
                                </>
                            ) : (
                                <>
                                    <FaLightbulb />
                                    Genereer Vacaturetekst
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                    </form>
                </motion.div>

                {generatedVacancy && (
                    <motion.div 
                        className="vacancy-preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="preview-header">
                            <h2>Gegenereerde Vacaturetekst</h2>
                            <button 
                                className="copy-button"
                                onClick={handleCopyText}
                            >
                                Kopieer tekst
                            </button>
                        </div>
                        <div 
                            className="preview-content"
                            dangerouslySetInnerHTML={{ __html: generatedVacancy }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CreateVacancy; 