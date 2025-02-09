import React from 'react';
import { FaUsers, FaHandshake, FaBriefcase, FaChartBar } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="dashboard-sidebar">
            <ul>
                <li 
                    className={activeTab === 'candidates' ? 'active' : ''}
                    onClick={() => setActiveTab('candidates')}
                >
                    <FaUsers /> Kandidaten
                </li>
                <li 
                    className={activeTab === 'matching' ? 'active' : ''}
                    onClick={() => setActiveTab('matching')}
                >
                    <FaHandshake /> Matchen
                </li>
                <li 
                    className={activeTab === 'analytics' ? 'active' : ''}
                    onClick={() => setActiveTab('analytics')}
                >
                    <FaChartBar /> Analytics
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar; 