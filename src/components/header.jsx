import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <div className="container">
                <nav className="nav-bar">
                    <Link to="/" className="nav-branding">
                        <img src={logo} alt="Recruivia" />
                    </Link>

                    <div 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>

                    <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/how-it-works" className="nav-link" onClick={closeMenu}>
                                Hoe het werkt
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/#pricing" className="nav-link" onClick={closeMenu}>
                                Prijzen
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link" onClick={closeMenu}>
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link" onClick={closeMenu}>
                                Registreer
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
