import React from 'react';

function Leagues() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Golf Leagues & Tournaments</h1>
        <p>Join competitive leagues and tournaments at GolfSim</p>
      </div>
      
      <section className="leagues-grid">
        <div className="league-card">
          <h3>Monday Night League</h3>
          <p><strong>When:</strong> Mondays 7:00 PM - 9:00 PM</p>
          <p><strong>Format:</strong> Stroke Play</p>
          <p><strong>Entry Fee:</strong> $25/week</p>
          <button className="feature-btn">Join League</button>
        </div>
        
        <div className="league-card">
          <h3>Weekend Tournament</h3>
          <p><strong>When:</strong> Saturdays 2:00 PM - 6:00 PM</p>
          <p><strong>Format:</strong> Match Play</p>
          <p><strong>Entry Fee:</strong> $40/tournament</p>
          <button className="feature-btn">Register</button>
        </div>
        
        <div className="league-card">
          <h3>Corporate League</h3>
          <p><strong>When:</strong> Thursdays 6:00 PM - 8:00 PM</p>
          <p><strong>Format:</strong> Team Scramble</p>
          <p><strong>Entry Fee:</strong> $100/team/month</p>
          <button className="feature-btn">Sign Up Team</button>
        </div>
      </section>
    </div>
  );
}

export default Leagues;