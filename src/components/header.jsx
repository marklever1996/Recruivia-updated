import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBell, FaUserCircle, FaEnvelope, FaFileAlt, FaSearch, FaUserCheck, FaMicrophone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import RecentActivity from './dashboard/RecentActivity';
import logo from '../assets/images/logo.png';
import '../styles/Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Dit later vervangen door echte auth check
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // Tijdelijke check - later vervangen door echte auth
        const checkIfLoggedIn = () => {
            const loggedInPaths = [
                '/dashboard', 
                '/dashboard-candidates', 
                '/add-candidate', 
                '/vacancy-dashboard',
                '/meeting-overview',
                '/new-meeting',
                '/match-analysis',
                '/applications',
                '/improvements',
                '/create-vacancy',
                '/vacancy-preview',
                '/matching-dashboard',
                '/agenda',
                '/mail',
                '/profile',
                '/import-recording',
                '/agenda',
                '/vacancy/:id'
            ];
            setIsLoggedIn(loggedInPaths.some(path => location.pathname.startsWith(path)));
        };

        checkIfLoggedIn();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    const handleNotificationClick = (e) => {
        e.preventDefault();
        setShowNotifications(!showNotifications);
    };

    // Sluit notificaties als er buiten wordt geklikt
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.notification-dropdown') && 
                !e.target.closest('.notification-icon')) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const LoggedInNav = () => (
        <nav className="sidebar">
            <Link to="/dashboard" className="nav-branding">
                <img src={logo} alt="Recruivia" className="logo-small" />
            </Link>

            {/* Quick Actions */}
            <div className="header-quick-actions">
                <Link to="/dashboard" className="quick-action-btn" title="Dashboard">
                    <FaHome />
                    <span className="action-label">Dashboard</span>
                </Link>
                <Link to="/vacancy-dashboard" className="quick-action-btn" title="Vacature maken">
                    <FaFileAlt />
                    <span className="action-label">Vacature maken</span>
                </Link>
                <Link to="/dashboard-candidates" className="quick-action-btn" title="Kandidaten zoeken">
                    <FaSearch />
                    <span className="action-label">Kandidaten zoeken</span>
                </Link>
                <Link to="/match-analysis" className="quick-action-btn" title="Match analyse">
                    <FaUserCheck />
                    <span className="action-label">Match analyse</span>
                </Link>
                <Link to="/meeting-overview" className="quick-action-btn" title="Gesprek opnemen">
                    <FaMicrophone />
                    <span className="action-label">Gesprek opnemen</span>
                </Link>
            </div>

            {/* Regular Nav Items */}
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/agenda" className="nav-link" title="Agenda">
                        <FaCalendarAlt />
                        <span>Agenda</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/mail" className="nav-link" title="Mail">
                        <FaEnvelope />
                        <span>Mail</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <div className="notification-wrapper">
                        <button 
                            onClick={handleNotificationClick}
                            className="nav-link notification-button"
                            title="Notificaties"
                        >
                            <div className="notification-icon">
                                <FaBell />
                                <span>Notificaties</span>
                                <div className="notification-badge">3</div>
                            </div>
                        </button>
                        
                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div 
                                    className="notification-dropdown"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <RecentActivity />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" title="Profiel">
                        <FaUserCircle />
                        <span>Profiel</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );

    const LoggedOutNav = () => (
        <nav className="nav-bar">
            <Link to="/" className="nav-branding">
                <img src={logo} alt="Recruivia" />
            </Link>

            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/how-it-works" className="nav-link">Hoe het werkt</Link>
                </li>
                <li className="nav-item">
                    <Link to="/pricing" className="nav-link">Prijzen</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Probeer het gratis</Link>
                </li>
            </ul>
        </nav>
    );

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <div className="container">
                {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
            </div>
        </header>
    );
};

export default Header;
