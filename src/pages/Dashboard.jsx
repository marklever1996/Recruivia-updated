import React, { useState } from 'react';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import QuickActions from '../components/dashboard/QuickActions';
import AIChatbot from '../components/dashboard/AIChatbot';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [userName] = useState('Mark');

    return (
        <div className="dashboard">
            <div className="dashboard-grid">
                <div className="dashboard-main">
                    <WelcomeSection userName={userName} />
                    <QuickActions />
                </div>
                <div className="dashboard-sidebar">
                    <AIChatbot />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 