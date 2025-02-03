import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
// Pre-signup pages
import Landingpage from './pages/Landingpage';
import HowItWorks from './pages/how-it-works';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Register from './pages/Register';
// Post-signup pages
import Dashboard from './pages/Dashboard';
import VacancyDashboard from './components/dashboard/create-vacancy/VacancyDashboard';
import Vacatures from './pages/Vacatures';
import VacatureGenerator from './pages/VacatureGenerator';
import NewMeeting from './components/dashboard/gesprek-opnemen/NewMeeting';
import ImportRecordings from './components/dashboard/gesprek-opnemen/ImportRecordings';
import CreateVacancy from './components/dashboard/create-vacancy/CreateVacancy';
import VacancyPreview from './components/dashboard/create-vacancy/VacancyPreview';
import MatchAnalysis from './components/dashboard/match-analysis/MatchAnalysis';
import SearchCandidates from './components/dashboard/search-candidates/SearchCandidates';
import Improvements from './components/dashboard/improvements/Improvements';

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
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vacancy-dashboard" element={<VacancyDashboard />} />
                <Route path="/vacatures" element={<Vacatures />} />
                <Route path="/vacatures/generator" element={<VacatureGenerator />} />
                <Route path="/new-meeting" element={<NewMeeting />} />
                <Route path="/import-recording" element={<ImportRecordings />} />
                <Route path="/create-vacancy" element={<CreateVacancy />} />
                <Route path="/vacancy-preview" element={<VacancyPreview />} />
                <Route path="/match-analysis" element={<MatchAnalysis />} />
                <Route path="/search-candidates" element={<SearchCandidates />} />
                <Route path="/improvements" element={<Improvements />} />
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
    );
}

export default App;
