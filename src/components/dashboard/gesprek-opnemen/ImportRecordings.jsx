import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFile, FaCheck, FaTimes } from 'react-icons/fa';
import './ImportRecordings.css';

const ImportRecordings = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const allowedTypes = {
        'video/mp4': true,
        'video/quicktime': true, // .mov
        'audio/mpeg': true, // .mp3
        'audio/wav': true,
        'video/webm': true,
    };

    const maxSize = 1.5 * 1024 * 1024 * 1024; // 1.5GB in bytes

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError(null);
        
        if (rejectedFiles.length > 0) {
            const rejection = rejectedFiles[0];
            if (rejection.size > maxSize) {
                setError('Bestand is te groot (max 1.5GB)');
            } else if (!allowedTypes[rejection.type]) {
                setError('Ongeldig bestandstype. Toegestaan: MP4, MOV, MP3, WAV, WEBM');
            }
            return;
        }

        const file = acceptedFiles[0];
        setFile(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.webm'],
            'audio/*': ['.mp3', '.wav']
        },
        maxSize,
        multiple: false
    });

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
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
                    <p className="upload-description">
                        Upload een audio of video bestand voor AI-transcriptie
                    </p>

                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="dropzone"
                                className={`dropzone ${isDragActive ? 'active' : ''}`}
                                {...getRootProps()}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <input {...getInputProps()} />
                                <FaCloudUploadAlt className="upload-icon" />
                                <p className="primary-text">
                                    {isDragActive ? 
                                        'Drop het bestand hier...' : 
                                        'Sleep een bestand hierheen of klik om te bladeren'
                                    }
                                </p>
                                <p className="secondary-text">
                                    MP4, MOV, MP3, WAV, WEBM (max 1.5GB)
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file-preview"
                                className="file-preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
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
                                <motion.button
                                    className="start-upload"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Start Transcriptie
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

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
