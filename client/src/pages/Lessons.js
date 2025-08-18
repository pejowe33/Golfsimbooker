import React from 'react';

function Lessons() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Golf Lessons</h1>
        <p>Improve your game with our professional instructors</p>
      </div>
      
      <section className="instructors-grid">
        <div className="instructor-card">
          <div className="instructor-image">👨‍🏫</div>
          <h3>Mike Johnson</h3>
          <p><strong>Experience:</strong> 15 years PGA Professional</p>
          <p><strong>Specialty:</strong> Swing mechanics, Short game</p>
          <p><strong>Rate:</strong> $80/hour</p>
          <button className="feature-btn">Book with Mike</button>
        </div>
        
        <div className="instructor-card">
          <div className="instructor-image">👩‍🏫</div>
          <h3>Sarah Williams</h3>
          <p><strong>Experience:</strong> 12 years LPGA Professional</p>
          <p><strong>Specialty:</strong> Putting, Mental game</p>
          <p><strong>Rate:</strong> $75/hour</p>
          <button className="feature-btn">Book with Sarah</button>
        </div>
        
        <div className="instructor-card">
          <div className="instructor-image">👨‍🏫</div>
          <h3>Tom Davis</h3>
          <p><strong>Experience:</strong> 20 years Teaching Professional</p>
          <p><strong>Specialty:</strong> Beginners, Junior golf</p>
          <p><strong>Rate:</strong> $70/hour</p>
          <button className="feature-btn">Book with Tom</button>
        </div>
      </section>
    </div>
  );
}

export default Lessons;