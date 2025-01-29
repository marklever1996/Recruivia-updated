import React from 'react';

const WelcomeSection = ({ userName, subtitle }) => {
    return (
        <div className="welcome-section">
            <h1 className="welcome-title">
                Welkom terug, {userName}
            </h1>
            <p className="welcome-subtitle">{subtitle}</p>
        </div>
    );
};

export default WelcomeSection; 