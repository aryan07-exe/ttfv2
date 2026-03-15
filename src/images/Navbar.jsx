import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../images/newlogo3.png';
import ExploreForm from './ExploreForm';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNowClick = () => {
    setIsFormOpen(true);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="TTF Holidays" className="logo-image" />
            <h2 className="company-name">TTF HOLIDAYS</h2>
          </div>

          <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <a href="#hero" className="nav-link" onClick={() => scrollToSection('hero')}>
              About
            </a>
            <a href="#domestic" className="nav-link" onClick={() => scrollToSection('domestic-section')}>
              Domestic
            </a>
            <a href="#international" className="nav-link" onClick={() => scrollToSection('international-section')}>
              International
            </a>
            <a href="#testimonials" className="nav-link" onClick={() => scrollToSection('testimonials-section')}>
              Experiences
            </a>
            <a href="#gallery" className="nav-link" onClick={() => scrollToSection('gallery-section')}>
              Gallery
            </a>
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact-section')}>
              Contact
            </a>
            <button className="nav-button" onClick={handleBookNowClick}>
              Book Now
            </button>
          </div>

          <div 
            className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <ExploreForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default Navbar;
