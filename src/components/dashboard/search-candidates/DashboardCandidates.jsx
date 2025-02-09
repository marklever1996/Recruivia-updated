import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';   
import AIChatbot from '../AIChatbot';
import MatchingDashboard from './MatchingDashboard';
import CandidatesOverview from './CandidatesOverview';

import './DashboardCandidates.css';

const DashboardCandidates = () => {
    const [activeTab, setActiveTab] = useState('candidates');
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const fetchCandidates = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/candidates');
            if (!response.ok) {
                throw new Error('Failed to fetch candidates');
            }
            const data = await response.json();
            setCandidates(data);
        } catch (err) {
            console.error('Error loading candidates:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    // Refresh wanneer we terugkomen van AddCandidate
    useEffect(() => {
        if (location.state?.refreshCandidates) {
            fetchCandidates();
        }
    }, [location.state]);

    // Highlight nieuwe kandidaat
    const isNewCandidate = (candidateId) => {
        return location.state?.newCandidateId === candidateId;
    };

    return (
        <div className="dashboard">
            <div className="dashboard-content">  
                <main className="dashboard-main">
                    
                    {/* Main Content Area */}
                    {activeTab === 'candidates' && <CandidatesOverview />}
                    {activeTab === 'matching' && <MatchingDashboard />}
                    {activeTab === 'analytics' && <div>Analytics dashboard komt hier</div>}
                </main>

                <AIChatbot />
            </div>
        </div>
    );
};

export default DashboardCandidates; 