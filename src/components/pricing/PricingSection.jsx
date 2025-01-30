import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRocket, FaBuilding, FaGlobe } from 'react-icons/fa';
import './PricingSection.css';

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const calculateAnnualPrice = (monthlyPrice) => {
        // 25% korting voor jaarlijks plan
        return Math.round(monthlyPrice * 0.75);
    };

    const plans = [
        {
            name: "Starter",
            icon: <FaRocket />,
            price: isAnnual ? calculateAnnualPrice(47) : 47,
            priceDetail: "per recruiter, per maand",
            description: "Perfect voor kleine recruitmentbureaus die willen starten met AI",
            features: [
                "AI Gesprekstranscriptie (10 uur/maand)",
                "Basis recruiter feedback",
                "10 AI vacatureteksten per maand",
                "Basis kandidaat matching",
                "Email support binnen 24 uur",
                "Onboarding ondersteuning",
                "Basis analytics dashboard"
            ],
            highlight: false,
            cta: "Start gratis demo"
        },
        {
            name: "Professional",
            icon: <FaBuilding />,
            price: isAnnual ? calculateAnnualPrice(79) : 79,
            priceDetail: "per recruiter, per maand",
            description: "Voor het maximale uit AI willen halen",
            features: [
                "Onbeperkte AI Gesprekstranscriptie",
                "Uitgebreide recruiter feedback",
                "Onbeperkte AI vacatureteksten",
                "Geavanceerde kandidaat matching",
                "Premium support binnen 4 uur",
                "Persoonlijke onboarding",
                "Uitgebreid analytics dashboard",
                "Team management",
                "API toegang",
                "Custom templates"
            ],
            highlight: true,
            cta: "Start gratis demo"
        },
        {
            name: "Enterprise",
            icon: <FaGlobe />,
            price: "Custom",
            priceDetail: "aangepast op uw wensen",
            description: "Voor grote organisaties met specifieke wensen en eisen",
            features: [
                "Alles uit Professional",
                "Custom AI model training",
                "Dedicated account manager",
                "24/7 Premium support",
                "Custom integraties",
                "SLA garantie",
                "On-premise optie",
                "Custom reporting",
                "White-label optie",
                "Volume korting"
            ],
            highlight: false,
            cta: "Neem contact op"
        }
    ];

    return (
        <section className="pricing-section">
            <div className="pricing-container">
                <motion.div 
                    className="pricing-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="header-content">
                        {/* <span className="pricing-label">Prijzen</span> */}
                        <h2>Transparante prijzen voor elke schaal</h2>
                        <p>Kies het plan dat bij jouw organisatie past</p>
                    </div>
                    
                    <div className="pricing-toggle">
                        <span className={!isAnnual ? 'active' : ''}>Maandelijks</span>
                        <button 
                            className={`toggle-button ${isAnnual ? 'active' : ''}`}
                            onClick={() => setIsAnnual(!isAnnual)}
                            aria-label="Toggle pricing period"
                        >
                            <span className="toggle-slider"></span>
                        </button>
                        <span className={isAnnual ? 'active' : ''}>
                            Jaarlijks <span className="discount">25% korting</span>
                        </span>
                    </div>
                </motion.div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {plan.highlight && (
                                <div className="popular-badge">Meest gekozen</div>
                            )}
                            <div className="plan-icon">{plan.icon}</div>
                            <h3>{plan.name}</h3>
                            <div className="plan-price">
                                {typeof plan.price === 'number' ? (
                                    <div className="price-wrapper">
                                        <div className="current-price">
                                            <span className="currency">€</span>
                                            <motion.span 
                                                className="amount"
                                                key={plan.price}
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {plan.price}
                                            </motion.span>
                                        </div>
                                        {isAnnual && (
                                            <motion.div 
                                                className="savings-tag"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Bespaar 25%
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    <span className="custom-price">{plan.price}</span>
                                )}
                            </div>
                            <p className="price-detail">{plan.priceDetail}</p>
                            <p className="plan-description">{plan.description}</p>
                            
                            <div className="feature-label">Inclusief:</div>
                            <ul className="plan-features">
                                {plan.features.map((feature, i) => (
                                    <motion.li 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                    >
                                        <FaCheck className="check-icon" />
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                            <button className={`plan-button ${plan.highlight ? 'highlight' : ''}`}>
                                {plan.cta}
                            </button>
                            {isAnnual && typeof plan.price === 'number' && (
                                <div className="annual-savings">
                                    <span className="savings-label">Bespaar €{Math.round((plan.price / 0.75) * 3)} per jaar</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection; 