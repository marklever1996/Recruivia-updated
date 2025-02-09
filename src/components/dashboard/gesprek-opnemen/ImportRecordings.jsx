import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaFile, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ImportRecordings.css';

const ImportRecordings = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [conversationType, setConversationType] = useState('');
    const fileInputRef = useRef(null);

    const conversationTypes = [
        { id: 'intake', label: 'Intake Gesprek' },
        { id: 'sollicitatie', label: 'Sollicitatie Gesprek' },
        { id: 'competentie', label: 'Competentie Gesprek' }
    ];

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const maxSize = 1.5 * 1024 * 1024 * 1024; // 1.5GB
        const allowedTypes = [
            'audio/mpeg',
            'audio/wav',
            'video/mp4',
            'video/quicktime',
            'video/webm'
        ];

        if (selectedFile) {
            if (selectedFile.size > maxSize) {
                setError('Bestand is te groot (max 1.5GB)');
                return;
            }
            
            if (!allowedTypes.includes(selectedFile.type)) {
                setError('Ongeldig bestandstype. Toegestaan: MP4, MOV, MP3, WAV, WEBM');
                return;
            }

            setError(null);
            setFile(selectedFile);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        handleFileValidation(droppedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileValidation = (file) => {
        const maxSize = 1.5 * 1024 * 1024 * 1024; // 1.5GB
        const allowedTypes = [
            'audio/mpeg',
            'audio/wav',
            'video/mp4',
            'video/quicktime',
            'video/webm'
        ];

        if (file.size > maxSize) {
            setError('Bestand is te groot (max 1.5GB)');
            return;
        }
        
        if (!allowedTypes.includes(file.type)) {
            setError('Ongeldig bestandstype. Toegestaan: MP4, MOV, MP3, WAV, WEBM');
            return;
        }

        setError(null);
        setFile(file);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleStartTranscription = async () => {
        if (!file || !conversationType) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('conversationType', conversationType);

        try {
            const response = await fetch('http://localhost:5000/api/transcribe', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Er is iets misgegaan');
            }

            const data = await response.json();
            console.log('Transcriptie resultaat:', data);
            // Hier kun je de gebruiker naar een resultaatpagina sturen
            // of de transcriptie op een andere manier tonen

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="import-recordings">
            <div className="upload-container">
                <motion.div 
                    className="upload-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Importeer Opname</h1>
                    
                    <div 
                        className="dropzone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".mp3,.wav,.mp4,.mov,.webm"
                            onChange={handleFileChange}
                            className="file-input"
                            style={{ display: 'none' }}
                        />
                        <div className="upload-icon">
                            <FaCloudUploadAlt />
                        </div>
                        <p>Sleep bestand hierheen of klik om te selecteren</p>
                        <span className="file-types">MP4, MOV, MP3, WAV, WEBM</span>
                    </div>

                    {file && (
                        <motion.div 
                            className="selected-file"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="file-info">
                                <FaFile className="file-icon" />
                                <div className="file-details">
                                    <p className="file-name">{file.name}</p>
                                    <p className="file-size">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                                <button 
                                    className="remove-file"
                                    onClick={handleRemoveFile}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="conversation-type-selector">
                                <p className="selector-label">Selecteer het type gesprek:</p>
                                <div className="type-options">
                                    {conversationTypes.map(type => (
                                        <button
                                            key={type.id}
                                            className={`type-option ${conversationType === type.id ? 'selected' : ''}`}
                                            onClick={() => setConversationType(type.id)}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                className={`start-upload ${!conversationType ? 'disabled' : ''}`}
                                onClick={handleStartTranscription}
                                disabled={!conversationType}
                            >
                                Start Transcriptie
                            </button>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <FaTimes />
                            {error}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ImportRecordings;
