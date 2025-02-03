import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import NotificationPanel from './components/NotificationPanel';
import MatchingDashboard from './MatchingDashboard';
import './DashboardCandidates.css';

const DashboardCandidates = () => {
    const [activeTab, setActiveTab] = useState('candidates');

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <main className="dashboard-main">
                    <SearchBar />
                    
                    {/* Main Content Area */}
                    {activeTab === 'candidates' && <div>Kandidaten overzicht komt hier</div>}
                    {activeTab === 'vacancies' && <div>Vacature overzicht komt hier</div>}
                    {activeTab === 'matching' && <MatchingDashboard />}
                    {activeTab === 'analytics' && <div>Analytics dashboard komt hier</div>}

                </main>


                <NotificationPanel />
            </div>
        </div>
    );
};

export default DashboardCandidates; 