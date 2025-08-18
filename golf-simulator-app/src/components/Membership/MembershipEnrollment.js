import React, { useState } from 'react';

const MembershipEnrollment = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle membership enrollment
        // This could involve an API call to enroll the user
        setIsEnrolled(true);
    };

    return (
        <div className="membership-enrollment">
            <h2>Enroll in Membership</h2>
            {isEnrolled ? (
                <p>Thank you for enrolling, {name}! You will receive a confirmation email shortly.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Enroll</button>
                </form>
            )}
        </div>
    );
};

export default MembershipEnrollment;