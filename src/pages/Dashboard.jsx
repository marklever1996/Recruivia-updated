import React, { useState } from 'react';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
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
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 