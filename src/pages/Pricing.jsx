import React from 'react';
import PricingSection from '../components/pricing/PricingSection';
import Testimonials from '../components/pricing/Testimonials';
import CallToActionPricing from '../components/pricing/CallToActionPricing';
import Footer from '../components/Footer';

const Pricing = () => {
    return (
        <>
            <PricingSection />
            <Testimonials />
            <CallToActionPricing />
            <Footer />
        </>
    );
};

export default Pricing;