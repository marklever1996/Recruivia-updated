import React from 'react';
import { Link } from 'react-router-dom';
import CallToActionService from '../components/how-it-works/CallToActionService';
import OurApproach from '../components/how-it-works/OurApproach';
import CallToActionHowItWorks from '../components/how-it-works/CallToActionHowItWorks';
import Footer from '../components/Footer';
import aiThumbnail from '../assets/images/Orange And Pink Illustrative Top AI Websites YouTube Thumbnail.png';

const HowItWorks = () => {
    return (
        <>
            <CallToActionService />
            <OurApproach />
            <CallToActionHowItWorks />
            <Footer />
            
        </>
    );
};

export default HowItWorks;
