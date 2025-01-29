import React from 'react';
import { Link } from 'react-router-dom';
import CallToActionService from '../components/how-it-works/CallToActionService';
import '../styles/how-it-works.css';
import aiThumbnail from '../assets/images/Orange And Pink Illustrative Top AI Websites YouTube Thumbnail.png';

const HowItWorks = () => {
    return (
        <>
            <CallToActionService />

            {/* Section 2 - Info */}
            <section className="info-section">
                <h1>
                    Op maat gemaakte AI <br />
                    <span>dat past bij jouw bedrijf</span>
                </h1>
                <p>
                    Met Recruivia kies je voor een partner die begrijpt dat recruitment niet one-size-fits-all is. 
                    Wij zorgen ervoor dat jouw unieke bedrijfsstijl en cultuur worden weerspiegeld in onze oplossingen, zodat je de beste resultaten behaalt. 
                    Laat de administratieve rompslomp aan ons over, en focus op wat je het beste doet: het aantrekken van topkandidaten die bij jouw organisatie passen.
                </p>
            </section>

            {/* Section 3 - Features */}
            <section className="features-section">
                <div className="feature-container">
                    <i className="fas fa-microphone-alt"></i>
                    <h2>Neem gesprekken op</h2>
                    <p>
                        Neem intakegesprekken, (open) sollicitaties, en competentiegesprekken op. 
                        Onze AI maakt automatisch aantekeningen en samenvattingen, zodat recruiters meer tijd kunnen besteden aan wat echt belangrijk is.
                    </p>
                </div>

                <div className="feature-container">
                    <i className="fas fa-file-alt"></i>
                    <h2>Genereer vacatureteksten</h2>
                    <p>
                        Maak AI-gegenereerde vacatureteksten die aansluiten bij de stijl van je organisatie. 
                        Bespaar tijd en verhoog de consistentie van je vacatures met onze slimme tekstgeneratie.
                    </p>
                </div>

                <div className="feature-container">
                    <i className="fas fa-users"></i>
                    <h2>Focus op kandidaten</h2>
                    <p>
                        Verminder administratieve taken en geef recruiters meer tijd om zich te focussen op het plaatsen van kandidaten. 
                        Laat repetitieve taken over aan de AI en verbeter de kwaliteit van je plaatsingen.
                    </p>
                </div>
            </section>

            {/* Section 4 - Video */}
            <section className="video-section">
                <h2>Hoe het werkt:</h2>
                <div className="video-container">
                    <video controls>
                        <source src="/videos/recruivia-demo.mp4" type="video/mp4" />
                        Je browser ondersteunt de video tag niet.
                    </video>
                </div>
            </section>

            {/* Section 5 - Control */}
            <section className="control-section">
                <div className="control-content">
                    <h2>
                        Jij hebt de regie,<br />
                        <span>Recruivia neemt het werk uit handen.</span>
                    </h2>
                    <p>
                        Met Recruivia kun je je volledig focussen op waar jij goed in bent, terwijl onze AI-oplossingen je administratieve lasten verlichten. 
                        Zo kun jij efficiënter werken, meer tijd besteden aan het opbouwen van relaties, en sneller de juiste kandidaten plaatsen.
                    </p>
                </div>
            </section>

            {/* Section 6 - Pricing */}
            <section className="pricing-section" id="pricing">
                <div className="pricing-container">
                    <div className="pricing-box standard">
                        <div className="title-box">
                            <h3>Proefversie</h3>
                        </div>
                        <div className="details-box">
                            <h4>Test ons product</h4>
                            <p className="price">€0</p>
                            <p>Gratis Consultafspraak</p>
                            <p>Gratis Demo</p>
                            <Link to="/contact" className="pricing-button">Contact</Link>
                        </div>
                    </div>

                    <div className="pricing-box premium">
                        <div className="title-box">
                            <h3>Standaard</h3>
                        </div>
                        <div className="details-box">
                            <h4>Basis AI-tools</h4>
                            <p className="price">€35 per gebruiker</p>
                            <p>Speech-to-text</p>
                            <p>AI- Aantekeningen</p>
                            <p>AI- Matching</p>
                            <Link to="/contact" className="pricing-button">Contact</Link>
                        </div>
                    </div>

                    <div className="pricing-box professional">
                        <div className="title-box">
                            <h3>Professional</h3>
                        </div>
                        <div className="details-box">
                            <h4>AI-tools op maat</h4>
                            <p className="price">Op aanvraag</p>
                            <p>Speech-to-Text</p>
                            <p>AI- Aantekeningen</p>
                            <p>AI- Matching</p>
                            <p>AI- Vacatures</p>
                            <Link to="/contact" className="pricing-button">Contact</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HowItWorks;
