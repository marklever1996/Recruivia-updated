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
import Vacatures from './pages/Vacatures';
import VacatureGenerator from './pages/VacatureGenerator';
import NewMeeting from './components/dashboard/gesprek-opnemen/NewMeeting';
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
                <Route path="/vacatures" element={<Vacatures />} />
                <Route path="/vacatures/generator" element={<VacatureGenerator />} />
                <Route path="/new-meeting" element={<NewMeeting />} />
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
