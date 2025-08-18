import React from 'react';

function GiftCards() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Gift Cards</h1>
        <p>Give the gift of golf to your friends and family</p>
      </div>
      
      <section className="gift-cards-grid">
        <div className="gift-card-option">
          <h3>Simulator Time Gift Card</h3>
          <div className="gift-amounts">
            <button className="amount-btn">$50</button>
            <button className="amount-btn">$100</button>
            <button className="amount-btn">$200</button>
            <button className="amount-btn">Custom Amount</button>
          </div>
          <p>Perfect for booking simulator sessions</p>
        </div>
        
        <div className="gift-card-option">
          <h3>Lesson Gift Card</h3>
          <div className="gift-amounts">
            <button className="amount-btn">1 Lesson - $75</button>
            <button className="amount-btn">3 Lessons - $210</button>
            <button className="amount-btn">5 Lessons - $325</button>
          </div>
          <p>Great for improving someone's golf game</p>
        </div>
        
        <div className="gift-card-option">
          <h3>Membership Gift Card</h3>
          <div className="gift-amounts">
            <button className="amount-btn">1 Month - $90</button>
            <button className="amount-btn">3 Months - $240</button>
            <button className="amount-btn">6 Months - $450</button>
          </div>
          <p>The ultimate gift for golf enthusiasts</p>
        </div>
      </section>
    </div>
  );
}

export default GiftCards;