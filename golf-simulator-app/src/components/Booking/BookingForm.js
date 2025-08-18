import React, { useState } from 'react';

const BookingForm = () => {
    const [date, setDate] = useState('');
    const [bays, setBays] = useState(1);
    const [people, setPeople] = useState(1);
    const [time, setTime] = useState('');
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle booking submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Booking Form</h2>
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
                Number of Bays:
                <select value={bays} onChange={(e) => setBays(e.target.value)} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </label>
            <label>
                Number of People:
                <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} min="1" required />
            </label>
            <label>
                Time:
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </label>
            {!isLoggedIn && (
                <>
                    <h3>User Information</h3>
                    <label>
                        Name:
                        <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} required />
                    </label>
                    <label>
                        Phone:
                        <input type="tel" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} required />
                    </label>
                </>
            )}
            <button type="submit">Confirm Booking</button>
        </form>
    );
};

export default BookingForm;