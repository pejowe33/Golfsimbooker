import React from 'react';

function BookNow() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Book a Golf Simulator</h1>
        <p>Reserve your time at our premium golf simulator facility</p>
      </div>
      
      <section className="booking-form">
        <h2>Select Your Session</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Time</label>
            <select>
              <option>Select a time</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
            </select>
          </div>
          <div className="form-group">
            <label>Duration</label>
            <select>
              <option>30 minutes - $25</option>
              <option>1 hour - $50</option>
              <option>2 hours - $100</option>
              <option>3 hours - $150</option>
              <option>4 hours - $200</option>
            </select>
          </div>
          <div className="form-group">
            <label>Number of Players</label>
            <select>
              <option>1 Player</option>
              <option>2 Players</option>
              <option>3 Players</option>
              <option>4 Players</option>
            </select>
          </div>
        </div>
        
        <button className="cta-button primary">Check Availability</button>
      </section>
    </div>
  );
}

export default BookNow;