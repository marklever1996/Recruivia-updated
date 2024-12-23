import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_repeat: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            // Implementeer Google login hier
            setIsLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setError('Google login mislukt. Probeer het opnieuw.');
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Vul alle verplichte velden in');
            return false;
        }
        if (!isLogin && formData.password !== formData.password_repeat) {
            setError('Wachtwoorden komen niet overeen');
            return false;
        }
        if (!isLogin && formData.password.length < 8) {
            setError('Wachtwoord moet minimaal 8 karakters bevatten');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setError('');
            
            // Implementeer login/register logica hier
            
            setIsLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: { 
            opacity: 0,
            y: -20,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div 
            className="auth-container"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
        >
            <div className="auth-background">
                <div className="auth-background-shape"></div>
                <div className="auth-background-shape"></div>
            </div>

            <div className="veen">
                <div className="auth-switcher">
                    <button 
                        className={`switch-button ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`switch-button ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Registreer
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={isLogin ? 'login' : 'register'}
                        initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
                        transition={{ duration: 0.3 }}
                        className="auth-form-container"
                    >
                        <form onSubmit={handleSubmit} className="auth-form">
                            <h2>{isLogin ? 'Welkom terug' : 'Maak een account aan'}</h2>
                            <p className="auth-subtitle">
                                {isLogin 
                                    ? 'Log in om door te gaan naar je dashboard' 
                                    : 'Registreer om te beginnen met Recruivia'}
                            </p>

                            {!isLogin && (
                                <div className="form-group">
                                    <MdPerson className="input-icon" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Volledige naam"
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <MdEmail className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email (werk)"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <MdLock className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Wachtwoord"
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <MdLock className="input-icon" />
                                    <input
                                        type="password"
                                        name="password_repeat"
                                        value={formData.password_repeat}
                                        onChange={handleInputChange}
                                        placeholder="Herhaal wachtwoord"
                                        required
                                    />
                                </div>
                            )}

                            {error && (
                                <motion.div 
                                    className="error-message"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    isLogin ? 'Login' : 'Registreer'
                                )}
                            </button>

                            <div className="divider">
                                <span>of</span>
                            </div>

                            <button 
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="google-button"
                                disabled={isLoading}
                            >
                                <FcGoogle />
                                <span>Doorgaan met Google</span>
                            </button>

                            <p className="auth-footer">
                                {isLogin ? (
                                    <>
                                        Nog geen account?{' '}
                                        <button 
                                            type="button"
                                            onClick={() => setIsLogin(false)}
                                            className="text-button"
                                        >
                                            Registreer hier
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Al een account?{' '}
                                        <button 
                                            type="button"
                                            onClick={() => setIsLogin(true)}
                                            className="text-button"
                                        >
                                            Login hier
                                        </button>
                                    </>
                                )}
                            </p>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Register;
