import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Golf Simulator Venue</h1>
            <p>Your ultimate destination for golf simulation, lessons, and leagues!</p>
            <div className="home-links">
                <Link to="/booking" className="home-link">Book a Bay</Link>
                <Link to="/leagues" className="home-link">Join a League</Link>
                <Link to="/lessons" className="home-link">Book a Lesson</Link>
                <Link to="/giftcards" className="home-link">Purchase Gift Cards</Link>
                <Link to="/membership" className="home-link">Membership Options</Link>
            </div>
        </div>
    );
};

export default Home;