import React from 'react';
import '../styles/Contact.css';
// import mailIcon from '../assets/images/mail.svg';
// import pinIcon from '../assets/images/pin.svg';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier komt de logica voor het versturen van het formulier
        // Dit kan later worden aangesloten op een backend
    };

    return (
        <section id="cs-contact-240">
            <div className="cs-container">
                <div className="cs-left-section">
                    <div className="cs-content">
                        <h2 className="cs-title">
                            <span className="stuur">STUUR</span>{' '}
                            <span className="uppercase-black">EEN BERICHT</span>
                        </h2>
                        <p className="cs-text">
                            Heb je een vraag? Wij helpen je graag verder! Vul het contactformulier in en wij nemen zo snel mogelijk contact met je op.
                        </p>
                    </div>
                    <form id="cs-form-240" onSubmit={handleSubmit}>
                        <label className="cs-label">
                            Naam
                            <input 
                                className="cs-input" 
                                required 
                                type="text" 
                                id="name-240" 
                                name="naam" 
                                placeholder="Naam"
                            />
                        </label>
                        <label className="cs-label">
                            Email
                            <input 
                                className="cs-input" 
                                required 
                                type="email" 
                                id="email-240" 
                                name="email" 
                                placeholder="Email"
                            />
                        </label>
                        <label className="cs-label">
                            Telefoon
                            <input 
                                className="cs-input" 
                                required 
                                type="tel" 
                                id="phone-240" 
                                name="telefoon" 
                                placeholder="Telefoonnummer"
                            />
                        </label>
                        <label className="cs-label cs-label-message">
                            Bericht
                            <textarea 
                                className="cs-input cs-textarea" 
                                required 
                                name="Message" 
                                id="message-240" 
                                placeholder="Je bericht..."
                            />
                        </label>
                        <button className="cs-button-solid cs-submit" type="submit">
                            Verstuur je bericht
                        </button>
                    </form>
                </div>
                <div className="cs-right-section">
                    <ul className="cs-ul">
                        <li className="cs-li">
                            <picture className="cs-icon-wrapper">
                                <img 
                                    aria-hidden="true" 
                                    // src={mailIcon} 
                                    alt="mail icon" 
                                    className="cs-icon" 
                                    width="36" 
                                    height="36" 
                                />
                            </picture>
                            <div className="cs-flex-group">
                                <span className="cs-header">Email</span>
                                <a href="mailto:info@recruivia.nl" className="cs-link">
                                    info@recruivia.nl
                                </a>
                            </div>
                        </li>
                        <li className="cs-li">
                            <picture className="cs-icon-wrapper">
                                <img 
                                    aria-hidden="true" 
                                    // src={pinIcon} 
                                    alt="address icon" 
                                    className="cs-icon" 
                                    width="36" 
                                    height="36" 
                                />
                            </picture>
                            <div className="cs-flex-group">
                                <span className="cs-header">Adres</span>
                                <a 
                                    href="https://maps.google.com/?q=Hyacinthstraat+198,+9713XL+Groningen" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="cs-link"
                                >
                                    Hyacinthstraat 198, 9713XL Groningen
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div className="cs-map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2388.4198942732055!2d6.58587581302659!3d53.22824897213948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9d2a25089291b%3A0xf7c7281cf346089a!2sHyacinthstraat%20198%2C%209713%20XL%20Groningen!5e0!3m2!1sen!2snl!4v1725437161877!5m2!1sen!2snl" 
                            width="600" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Locatie Recruivia"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
