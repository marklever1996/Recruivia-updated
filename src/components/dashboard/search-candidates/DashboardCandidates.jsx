import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import AIChatbot from './components/AIChatbot';
import MatchingDashboard from './MatchingDashboard';
import CandidatesOverview from './CandidatesOverview';

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
                    {activeTab === 'candidates' && <CandidatesOverview />}
                    {activeTab === 'vacancies' && <div>Vacature overzicht komt hier</div>}
                    {activeTab === 'matching' && <MatchingDashboard />}
                    {activeTab === 'analytics' && <div>Analytics dashboard komt hier</div>}


                </main>

                <AIChatbot />
            </div>
        </div>
    );
};

export default DashboardCandidates; 