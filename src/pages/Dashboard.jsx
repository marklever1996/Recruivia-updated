import React, { useState } from 'react';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import VacancyOverview from '../components/dashboard/VacancyOverview';
import VacancyMetrics from '../components/dashboard/VacancyMetrics';
import RecentVacancies from '../components/dashboard/RecentVacancies';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [userName] = useState('Mark');
    const [recentVacancies] = useState([
        { 
            id: 1, 
            title: "Senior React Developer",
            department: "Engineering",
            status: "Active",
            applicants: 12,
            daysActive: 5
        },
        { 
            id: 2, 
            title: "UX/UI Designer",
            department: "Design",
            status: "Draft",
            applicants: 0,
            daysActive: 0
        },
    ]);

    const [metrics] = useState({
        activeVacancies: 8,
        totalApplicants: 45,
        averageApplicants: 12,
        conversionRate: "18%"
    });

    return (
        <div className="dashboard">
            <WelcomeSection 
                userName={userName} 
                subtitle="Beheer je vacatures en volg de resultaten"
            />
            
            <VacancyOverview 
                quickActions={[
                    { label: "Nieuwe Vacature", action: "create", icon: "plus" },
                    { label: "AI Tekst Generator", action: "generate", icon: "sparkles" },
                    { label: "Vacature Templates", action: "templates", icon: "template" }
                ]}
            />
            
            <VacancyMetrics metrics={metrics} />
            
            <RecentVacancies 
                vacancies={recentVacancies}
                title="Recent Bijgewerkte Vacatures"
            />
        </div>
    );
};

export default Dashboard; 