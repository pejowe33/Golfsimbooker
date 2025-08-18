import React from 'react';
import { Link } from 'react-router-dom';

function Home({ apiStatus, error }) {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Premium Golf Simulator Experience
            <span className="hero-subtitle">Perfect your swing year-round</span>
          </h1>
          <p className="hero-description">
            Book time at our state-of-the-art golf simulator facility with 5 premium bays.
            Practice, play and compete regardless of weather.
          </p>
          <div className="hero-cta">
            <Link to="/book" className="cta-button primary">Book a Bay</Link>
            <button className="cta-button secondary">Join Membership</button>
          </div>
          
          <div className="status-pill">
            <div className={`status-indicator ${apiStatus && apiStatus.includes('✅') ? 'online' : 'offline'}`}></div>
            <span className="status-text">{apiStatus && apiStatus.includes('✅') ? 'System Online' : 'Connecting...'}</span>
          </div>
          
          {error && (
            <div className="error-message">
              <strong>Debug Info:</strong> {error}
            </div>
          )}
        </div>
        <div className="hero-image"></div>
      </header>
      
      <section className="intro">
        <h2 className="section-title">The Ultimate Golf Experience</h2>
        <p className="section-description">
          Our state-of-the-art facility offers accurate ball tracking, stunning course 
          visuals, and a comfortable environment to elevate your golf game year-round.
        </p>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📅</div>
            </div>
            <h3>Book Sessions</h3>
            <p>Reserve your golf simulator time with flexible 30-minute to 4-hour sessions</p>
            <Link to="/book" className="feature-btn">Book Now</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🏆</div>
            </div>
            <h3>Join Leagues</h3>
            <p>Compete with other golfers in our weekly leagues and tournaments</p>
            <Link to="/leagues" className="feature-btn">View Leagues</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📚</div>
            </div>
            <h3>Book Lessons</h3>
            <p>Improve your game with our professional golf instructors</p>
            <Link to="/lessons" className="feature-btn">Schedule Lesson</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🎁</div>
            </div>
            <h3>Gift Cards</h3>
            <p>Perfect gifts for the golfers in your life</p>
            <Link to="/gift-cards" className="feature-btn">Buy Gift Card</Link>
          </div>
        </div>
      </section>

      <section className="info-panels">
        <div className="hours-pricing-container">
          <div className="hours-section">
            <div className="info-header">
              <div className="info-icon">⏰</div>
              <h3>Hours of Operation</h3>
            </div>
            <ul>
              <li><strong>Mon-Thu:</strong> 10:00 AM - 10:00 PM</li>
              <li><strong>Friday:</strong> 10:00 AM - 12:00 AM</li>
              <li><strong>Saturday:</strong> 9:00 AM - 12:00 AM</li>
              <li><strong>Sunday:</strong> 10:00 AM - 10:00 PM</li>
            </ul>
          </div>
          
          <div className="pricing-section">
            <div className="info-header">
              <div className="info-icon">💰</div>
              <h3>Pricing</h3>
            </div>
            <ul>
              <li><strong>Off-Peak:</strong> $50/hour <span>(Mon-Fri 10am-5pm)</span></li>
              <li><strong>Peak Hours:</strong> $60/hour <span>(Mon-Fri 5pm+, Weekends)</span></li>
              <li><strong>Membership:</strong> $90/month <span>(2 free hours + $40/hour after)</span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;