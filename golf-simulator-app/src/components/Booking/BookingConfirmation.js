import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const { bookingDetails } = location.state || {};

    return (
        <div className="booking-confirmation">
            <h1>Booking Confirmation</h1>
            {bookingDetails ? (
                <div>
                    <h2>Thank you for your booking!</h2>
                    <p><strong>Name:</strong> {bookingDetails.name}</p>
                    <p><strong>Email:</strong> {bookingDetails.email}</p>
                    <p><strong>Phone:</strong> {bookingDetails.phone}</p>
                    <p><strong>Date:</strong> {bookingDetails.date}</p>
                    <p><strong>Time:</strong> {bookingDetails.time}</p>
                    <p><strong>Number of Bays:</strong> {bookingDetails.bays}</p>
                    <p><strong>Number of People:</strong> {bookingDetails.people}</p>
                    <p><strong>Total Price:</strong> ${bookingDetails.price}</p>
                </div>
            ) : (
                <p>No booking details available.</p>
            )}
        </div>
    );
};

export default BookingConfirmation;