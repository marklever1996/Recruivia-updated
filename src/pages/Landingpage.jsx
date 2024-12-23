import React from 'react';
import HeroSection from '../components/landingpage/HeroSection';
import { Link } from 'react-router-dom';
import '../styles/Landingpage.css';

const Landingpage = () => {
    return (
        <>
            <HeroSection />
            {/* Section 2 - Diensten */}
            <section className="what-i-do">
                <div className="container-sec6">
                    <h2>
                        <span className="wat">Onze</span>
                        <span className="ikdoe"> diensten</span>
                    </h2>
                    <p className="p">
                        Bespaar tijd en verhoog je productiviteit met ons AI-gedreven platform voor recruitment. 
                        Onze geavanceerde technologieën helpen je bij het wervingsproces, van het efficiënt vastleggen van gesprekken tot het automatisch genereren van aantrekkelijke vacatureteksten. 
                        Ontdek hoe onze oplossingen je recruitmentstrategie kunnen optimaliseren en je kunnen ondersteunen in het vinden van de beste kandidaten.
                        <span className="leesmeer">
                            <Link to="/how-it-works">Lees meer</Link>
                        </span>
                    </p>
                </div>
            </section>

            {/* Section 3 - Categories */}
            <section className="categories">
                <div className="container-sec3">
                    <div className="category">
                        <div className="icon">
                            <img src="/assets/images/notes.avif" alt="Category Icon" />
                        </div>
                        <h3>AI gegenereerde aantekeningen</h3>
                        <p>
                            Laat AI voor jou de belangrijke punten vastleggen tijdens gesprekken. 
                            Bespaar tijd en zorg voor consistente, gedetailleerde notities van al je gesprekken.
                        </p>
                    </div>
                    <div className="category">
                        <div className="icon">
                            <img src="/assets/images/vacatures.png" alt="Vacatureteksten" />
                        </div>
                        <h3>AI gegenereerde vacatureteksten</h3>
                        <p>
                            Maak indruk met vacatureteksten die aantrekkelijk, duidelijk en effectief zijn. 
                            Versnel je wervingsproces met geoptimaliseerde teksten die opvallen.
                        </p>
                    </div>
                    <div className="category">
                        <div className="icon">
                            <img src="/assets/images/speech-to-text.png" alt="Speech-to-Text" />
                        </div>
                        <h3>AI matching</h3>
                        <p>
                            Vind de perfecte kandidaat met onze geavanceerde AI-matching technologie. 
                            Bespaar tijd en verhoog de kans op succes met gerichte, datagestuurde aanbevelingen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4 - Pricing Info */}
            <section className="pricing">
                <div className="container">
                    <div className="pricing-content">
                        <div className="pricing-image">
                            <img src="/assets/images/pricing.png" alt="Pricing" />
                        </div>
                        <div className="pricing-text">
                            <h2>Maandelijks<span className="price"> Opzegbaar</span></h2>
                            <p>
                                Voor onze AI-gedreven recruitmentsoftware is er geen aanbetaling vereist bij een standaard abonnement. 
                                Voor grotere en op maat gemaakte oplossingen stellen we een gepersonaliseerde offerte op, gebaseerd op de specifieke behoeften en functionaliteiten.
                            </p>
                            <div className="checkmarks">
                                <div className="checkmark">
                                    <h3>Transparante Kosten</h3>
                                    <p>Onze prijsstructuur is helder en eerlijk, met geen verborgen kosten. Je weet precies waar je aan toe bent.</p>
                                </div>
                                <div className="checkmark">
                                    <h3>Geavanceerde AI-functionaliteit</h3>
                                    <p>Profiteer van de optimalisatie van onze AI-gedreven recruitmenttools, 
                                    met continue verbeteringen en testen om te zorgen voor de beste prestaties.</p>
                                </div>
                                <div className="checkmark">
                                    <h3>24/7 Ondersteuning</h3>
                                    <p>Onze klantenservice is 24/7 bereikbaar zonder wachttijden of automatische menu's—je kunt altijd rechtstreeks contact met ons opnemen voor ondersteuning en vragen.</p>
                                </div>
                                <div className="checkmark">
                                    <h3>Hoge Prestaties en Betrouwbaarheid</h3>
                                    <p>Wij zorgen ervoor dat onze software voldoet aan hoge prestatienormen en betrouwbaarheid, zodat jij kunt vertrouwen op een effectief en efficiënt recruitmentproces.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5 - Pricing Plans */}
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

export default Landingpage; 