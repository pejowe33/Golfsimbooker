import React from 'react';
import { useState } from 'react';

const Membership = () => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [membershipDetails, setMembershipDetails] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMembershipDetails({
            ...membershipDetails,
            [name]: value,
        });
    };

    const handleEnroll = (e) => {
        e.preventDefault();
        // Logic to enroll the user in a membership
        setIsEnrolled(true);
    };

    return (
        <div className="membership-page">
            <h1>Membership Enrollment</h1>
            {isEnrolled ? (
                <div>
                    <h2>Thank you for enrolling!</h2>
                    <p>You are now a member. Enjoy your benefits!</p>
                </div>
            ) : (
                <form onSubmit={handleEnroll}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={membershipDetails.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={membershipDetails.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={membershipDetails.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Enroll in Membership</button>
                </form>
            )}
        </div>
    );
};

export default Membership;