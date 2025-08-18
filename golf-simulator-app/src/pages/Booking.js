import React, { useState } from 'react';
import BookingForm from '../components/Booking/BookingForm';
import BookingCalendar from '../components/Booking/BookingCalendar';
import BookingConfirmation from '../components/Booking/BookingConfirmation';

const Booking = () => {
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleBookingSubmit = (details) => {
        setBookingDetails(details);
    };

    return (
        <div className="booking-page">
            {bookingDetails ? (
                <BookingConfirmation details={bookingDetails} />
            ) : (
                <>
                    <BookingForm onSubmit={handleBookingSubmit} />
                    <BookingCalendar />
                </>
            )}
        </div>
    );
};

export default Booking;