import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simuleer verzending
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        // Toon success message
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-header-group">
                        <h1>Contact</h1>
                        <div className="animated-bar"></div>
                    </div>
                    <div className="contact-methods">
                        <a href="mailto:info@recruivia.nl" className="method-item">
                            <div className="icon-wrapper">
                                <FaEnvelope />
                            </div>
                            <span>info@recruivia.nl</span>
                        </a>
                        <a href="tel:+31501234567" className="method-item">
                            <div className="icon-wrapper">
                                <FaPhoneAlt />
                            </div>
                            <span>050 123 4567</span>
                        </a>
                        <a href="https://linkedin.com/company/recruivia" target="_blank" rel="noopener noreferrer" className="method-item">
                            <div className="icon-wrapper">
                                <FaLinkedin />
                            </div>
                            <span>LinkedIn</span>
                        </a>
                        <div className="method-item">
                            <div className="icon-wrapper">
                                <FaMapMarkerAlt />
                            </div>
                            <span>Hyacinthstraat 198, 9713 XL Groningen</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-header">
                        <h2>Stuur een bericht</h2>
                        <p>We reageren binnen 24 uur op werkdagen</p>
                    </div>
                    <div className="form-row">
                        <div className={`input-wrapper ${focusedInput === 'name' ? 'focused' : ''}`}>
                            <input 
                                type="text" 
                                placeholder="Naam" 
                                required 
                                onFocus={() => setFocusedInput('name')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>
                        <div className={`input-wrapper ${focusedInput === 'email' ? 'focused' : ''}`}>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                required 
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className={`input-wrapper ${focusedInput === 'phone' ? 'focused' : ''}`}>
                            <input 
                                type="tel" 
                                placeholder="Telefoon" 
                                required 
                                onFocus={() => setFocusedInput('phone')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>
                        <div className={`input-wrapper ${focusedInput === 'subject' ? 'focused' : ''}`}>
                            <select 
                                required
                                onFocus={() => setFocusedInput('subject')}
                                onBlur={() => setFocusedInput(null)}
                            >
                                <option value="">Selecteer onderwerp</option>
                                <option value="demo">Demo aanvragen</option>
                                <option value="pricing">Prijsinformatie</option>
                                <option value="support">Support</option>
                                <option value="other">Anders</option>
                            </select>
                        </div>
                    </div>
                    <div className={`input-wrapper ${focusedInput === 'message' ? 'focused' : ''}`}>
                        <textarea 
                            placeholder="Je bericht..." 
                            required 
                            rows="3"
                            onFocus={() => setFocusedInput('message')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    <button type="submit" className={`submit-button ${isSubmitting ? 'submitting' : ''}`}>
                        <span className="button-content">
                            {isSubmitting ? (
                                <span className="loading-dots">
                                    <span>.</span><span>.</span><span>.</span>
                                </span>
                            ) : (
                                <>
                                    Verstuur bericht
                                    <FaPaperPlane className="send-icon" />
                                </>
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
