import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Lisa van den Berg",
            role: "Senior Recruiter bij TechTalent",
            image: "/images/testimonial1.jpg",
            quote: "De AI-transcriptie en feedback hebben mijn gesprekken naar een hoger niveau getild. Ik kan me nu volledig focussen op de kandidaat.",
            rating: 5
        },
        {
            name: "Mark de Vries",
            role: "Recruitment Manager bij JobMatch",
            image: "/images/testimonial2.jpg",
            quote: "De automatische vacatureteksten besparen ons enorm veel tijd, en de kwaliteit is verrassend goed. Een echte game-changer.",
            rating: 5
        },
        {
            name: "Sarah Johnson",
            role: "HR Director bij GrowthCorp",
            image: "/images/testimonial3.jpg",
            quote: "De kandidaat matching functionaliteit heeft ons hele recruitment proces efficiënter gemaakt. We vinden nu sneller de juiste matches.",
            rating: 5
        }
    ];

    return (
        <section className="testimonials">
            <div className="testimonials-container">
                <motion.div 
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Wat onze klanten zeggen</h2>
                    <p>Ontdek hoe Recruivia recruitment teams helpt excelleren</p>
                </motion.div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="quote-icon">
                                <FaQuoteRight />
                            </div>
                            <div className="testimonial-content">
                                <p className="quote">{testimonial.quote}</p>
                                <div className="rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="star-icon" />
                                    ))}
                                </div>
                            </div>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 