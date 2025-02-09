import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { auth } from '../config/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Eerst Firebase authenticatie
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Stuur gebruikersdata naar backend
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password, // Nu sturen we het wachtwoord ook mee
                    provider: 'email',
                    uid: userCredential.user.uid // Firebase UID voor extra verificatie
                })
            });

            if (!response.ok) {
                throw new Error('Backend registratie mislukt');
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
            setError(getErrorMessage(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Stuur Google gebruikersdata naar backend
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    provider: 'google',
                    uid: result.user.uid // Firebase UID voor extra verificatie
                })
            });

            if (!response.ok) {
                throw new Error('Backend registratie mislukt');
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Google sign-in error:', error);
            setError(getErrorMessage(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'Dit email adres is al in gebruik.';
            case 'auth/invalid-email':
                return 'Ongeldig email adres.';
            case 'auth/operation-not-allowed':
                return 'Google sign-in is niet ingeschakeld.';
            case 'auth/weak-password':
                return 'Wachtwoord moet minimaal 6 karakters bevatten.';
            default:
                return 'Er is iets misgegaan. Probeer het opnieuw.';
        }
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

                    {error && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {error}
                        </motion.div>
                    )}

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
                            <input
                                type="password"
                                placeholder="Wachtwoord"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
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
