import React from 'react';
import HeroSection from '../components/landingpage/HeroSection';
import ServicesSection from '../components/landingpage/Services';
import SubtieleCallToAction from '../components/landingpage/SubtieleCallToAction';
import CallToAction from '../components/landingpage/CallToAction';
import DemoSection from '../components/landingpage/DemoSection';
import UniqueSellingPoints from '../components/landingpage/UniqueSellingPoints';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/Landingpage.css';

const Landingpage = () => {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <SubtieleCallToAction />
            <DemoSection />
            <UniqueSellingPoints />
            <CallToAction />
            <Footer />
        </>
    );
};

export default Landingpage; 