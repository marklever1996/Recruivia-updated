import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Pre-signup pages
import Landingpage from './pages/Landingpage';
import HowItWorks from './pages/how-it-works';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Register from './pages/Register';
// Post-signup pages
import Dashboard from './pages/Dashboard';
import Agenda from './components/dashboard/agenda/Agenda';

import VacancyDashboard from './components/dashboard/create-vacancy/VacancyDashboard';
import Vacatures from './pages/Vacatures';
import VacatureGenerator from './pages/VacatureGenerator';
import NewMeeting from './components/dashboard/gesprek-opnemen/NewMeeting';
import ImportRecordings from './components/dashboard/gesprek-opnemen/ImportRecordings';
import CreateVacancy from './components/dashboard/create-vacancy/CreateVacancy';
import VacancyPreview from './components/dashboard/create-vacancy/VacancyPreview';
import VacancyDetails from './components/dashboard/create-vacancy/VacancyDetails';

import DashboardCandidates from './components/dashboard/search-candidates/DashboardCandidates';
import MatchingDashboard from './components/dashboard/search-candidates/MatchingDashboard';
import CandidatesOverview from './components/dashboard/search-candidates/CandidatesOverview';
import MeetingOverview from './components/dashboard/gesprek-opnemen/MeetingOverview';

import MatchAnalysis from './components/dashboard/match-analysis/MatchAnalysis';
import Improvements from './components/dashboard/improvements/Improvements';

import AddCandidate from './components/dashboard/candidates/AddCandidate';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = false; // Vervang dit later met echte auth check
    
    if (!isAuthenticated) {
        return <Navigate to="/register" />;
    }
    
    return children;
};

function App() {
    return (
        <GoogleOAuthProvider clientId="1011798115477-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com">
            <Router>
                <Header />
                <Routes>
                    {/* Pre-signup pages */}
                    <Route path="/" element={<Landingpage />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    {/* Post-signup pages */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vacancy-dashboard" element={<VacancyDashboard />} />
                    <Route path="/vacancy/:id" element={<VacancyDetails />} />
                    <Route path="/vacatures" element={<Vacatures />} />
                    <Route path="/vacatures/generator" element={<VacatureGenerator />} />
                    <Route path="/new-meeting" element={<NewMeeting />} />
                    <Route path="/import-recording" element={<ImportRecordings />} />
                    <Route path="/create-vacancy" element={<CreateVacancy />} />
                    <Route path="/vacancy-preview" element={<VacancyPreview />} />
                    <Route path="/meeting-overview" element={<MeetingOverview />} />
                    <Route path="/dashboard-candidates" element={<DashboardCandidates />} />
                    <Route path="/agenda" element={<Agenda />} />
                
                    <Route path="/matching-dashboard" element={<MatchingDashboard />} />
                    <Route path="/match-analysis" element={<MatchAnalysis />} />
                    <Route path="/improvements" element={<Improvements />} />
                    <Route path="/add-candidate" element={<AddCandidate />} />
                    {/* <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    /> */}
                </Routes>
                {/* <Footer /> */}
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
