import React from 'react';

const GiftCards = () => {
    return (
        <div className="gift-cards">
            <h1>Gift Cards</h1>
            <p>Purchase gift cards that can be used for bookings, food, or merchandise.</p>
            <p>Gift cards are available for user-determined dollar amounts and have no expiration date.</p>
            <p>After purchasing, you will receive a code that can be used on future purchases.</p>
            {/* Add Gift Card Purchase Component */}
            <GiftCardPurchase />
        </div>
    );
};

export default GiftCards;