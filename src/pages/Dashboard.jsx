import React, { useState } from 'react';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import QuickActions from '../components/dashboard/QuickActions';
import StatisticsGrid from '../components/dashboard/StatisticsGrid';
import RecentInterviews from '../components/dashboard/RecentInterviews';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [userName] = useState('Mark');
    const [recentInterviews] = useState([
        { id: 1, candidate: "John Doe", position: "Senior Developer", date: "2024-03-15", status: "Completed" },
        { id: 2, candidate: "Jane Smith", position: "UX Designer", date: "2024-03-14", status: "Pending" },
    ]);

    const [statistics] = useState({
        totalInterviews: 24,
        activeVacancies: 8,
        potentialCandidates: 45,
        completedInterviews: 18
    });

    return (
        <div className="dashboard-container">
            <WelcomeSection userName={userName} />
            <QuickActions />
            <StatisticsGrid statistics={statistics} />
            <RecentInterviews interviews={recentInterviews} />
        </div>
    );
};

export default Dashboard; 