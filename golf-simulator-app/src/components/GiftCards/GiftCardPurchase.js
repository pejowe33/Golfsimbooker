import React, { useState } from 'react';

const GiftCardPurchase = () => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePurchase = (e) => {
        e.preventDefault();
        // Logic to handle gift card purchase
        // This could involve API calls to process the payment and send the gift card code
        if (amount && email) {
            setMessage(`Gift card of $${amount} purchased successfully! A code has been sent to ${email}.`);
            // Reset fields
            setAmount('');
            setEmail('');
        } else {
            setMessage('Please fill in all fields.');
        }
    };

    return (
        <div className="gift-card-purchase">
            <h2>Purchase Gift Card</h2>
            <form onSubmit={handlePurchase}>
                <div>
                    <label htmlFor="amount">Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Recipient's Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Purchase</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default GiftCardPurchase;