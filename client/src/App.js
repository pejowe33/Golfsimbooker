import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import page components (we'll create these)
import Home from './pages/Home';
import BookNow from './pages/BookNow';
import Leagues from './pages/Leagues';
import Lessons from './pages/Lessons';
import GiftCards from './pages/GiftCards';
import SignIn from './pages/SignIn';

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏌️</span>
          <span className="logo-text">GolfSim</span>
        </Link>
        
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/book" className={`nav-link ${isActive('/book') ? 'active' : ''}`}>Book Now</Link>
          <Link to="/leagues" className={`nav-link ${isActive('/leagues') ? 'active' : ''}`}>Leagues</Link>
          <Link to="/lessons" className={`nav-link ${isActive('/lessons') ? 'active' : ''}`}>Lessons</Link>
          <Link to="/gift-cards" className={`nav-link ${isActive('/gift-cards') ? 'active' : ''}`}>Gift Cards</Link>
          <Link to="/sign-in" className={`nav-link highlight ${isActive('/sign-in') ? 'active' : ''}`}>Sign In</Link>
        </div>
        
        <div className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        console.log('Attempting to connect to API...');
        
        // Try the proxied route first
        const response = await fetch('/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        setApiStatus(`✅ Connected: ${data.message}`);
        setApiData(data);
        setError(null);
        
      } catch (err) {
        console.error('API Connection Error:', err);
        
        // Try direct connection as fallback
        try {
          console.log('Trying direct connection to localhost:5000...');
          const directResponse = await fetch('http://localhost:5000/api/health');
          
          if (directResponse.ok) {
            const directData = await directResponse.json();
            setApiStatus(`⚠️ Direct connection works: ${directData.message}`);
            setError('Proxy issue - using direct connection');
            setApiData(directData);
          } else {
            throw new Error('Direct connection also failed');
          }
          
        } catch (directErr) {
          setApiStatus('❌ API not connected');
          setError(`Connection failed: ${err.message}`);
          setApiData(null);
        }
      }
    };

    checkAPI();
    
    // Retry every 30 seconds if failed
    const interval = setInterval(() => {
      if (apiStatus.includes('❌') || apiStatus.includes('⚠️')) {
        checkAPI();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [apiStatus]);

  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home apiStatus={apiStatus} error={error} />} />
        <Route path="/book" element={<BookNow />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🏌️</span>
            <span className="logo-text">GolfSim</span>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/book">Book Now</Link>
              <Link to="/leagues">Leagues</Link>
              <Link to="/lessons">Lessons</Link>
            </div>
            <div className="footer-column">
              <h4>Account</h4>
              <Link to="/sign-in">Sign In</Link>
              <a href="#">Register</a>
              <a href="#">Membership</a>
              <Link to="/gift-cards">Gift Cards</Link>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <a href="tel:555-123-4567">(555) 123-4567</a>
              <a href="mailto:contact@golfsim.com">contact@golfsim.com</a>
              <a href="#">123 Golf Lane, Golfville</a>
              <div className="social-links">
                <a href="#" className="social-link">📱</a>
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">📸</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 GolfSim. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>GolfSim Booking System</h1>
        <p>React app is working!</p>
        <div>
          <a href="/sign-in">Sign In</a>
        </div>
      </div>
    </Router>
  );
}

export default App;
