import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';


import '../styles/Register.css';
const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simuleer API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/dashboard');
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        // Simuleer Google OAuth
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/dashboard');
    };

    return (
        <div className="register-page">
            <div className="register-content">
                <motion.div 
                    className="register-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="register-header">
                        <h1>Start gratis met Recruivia</h1>
                    </div>

                    <div className="auth-options">
                        <button 
                            onClick={handleGoogleSignIn}
                            className="google-button"
                            disabled={isLoading}
                        >
                            <FcGoogle />
                            <span>Doorgaan met Google</span>
                        </button>

                        <div className="divider">
                            <span>of</span>
                        </div>

                        <form onSubmit={handleSubmit} className="email-form">
                            <input
                                type="email"
                                placeholder="Werk email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button 
                                type="submit"
                                className="submit-button"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-dots">
                                        <span>.</span><span>.</span><span>.</span>
                                    </span>
                                ) : (
                                    "Start gratis trial"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="benefits">
                        <div className="benefit-item">
                            <span className="check">✓</span>
                            <span>70% tijdsbesparing op administratie</span>
                        </div>
                        <div className="benefit-item">
                            <span className="check">✓</span>
                            <span>AI-powered gespreksverslagen</span>
                        </div>
                        <div className="benefit-item">
                            <span className="check">✓</span>
                            <span>Onbeperkt aantal gesprekken</span>
                        </div>
                    </div>

                    <p className="terms">
                        Door te registreren ga je akkoord met onze{' '}
                        <a href="/terms">Voorwaarden</a> en{' '}
                        <a href="/privacy">Privacy Policy</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
