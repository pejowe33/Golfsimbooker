import React, { useState, useEffect } from 'react';
import { getAvailableSlots } from '../../utils/api';

const BookingCalendar = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedBay, setSelectedBay] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        fetchAvailableSlots();
    }, [selectedDate]);

    const fetchAvailableSlots = async () => {
        const slots = await getAvailableSlots(selectedDate);
        setAvailableSlots(slots);
    };

    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    const handleBaySelection = (bay) => {
        setSelectedBay(bay);
        setTimeSlots(availableSlots[bay] || []);
    };

    return (
        <div className="booking-calendar">
            <h2>Select a Date and Time</h2>
            <input type="date" onChange={handleDateChange} />
            <div className="bays">
                {Array.from({ length: 5 }, (_, index) => (
                    <button key={index} onClick={() => handleBaySelection(index)}>
                        Bay {index + 1}
                    </button>
                ))}
            </div>
            {selectedBay !== null && (
                <div className="time-slots">
                    <h3>Available Time Slots for Bay {selectedBay + 1}</h3>
                    {timeSlots.length > 0 ? (
                        timeSlots.map((slot, index) => (
                            <div key={index} className="time-slot">
                                {slot}
                            </div>
                        ))
                    ) : (
                        <p>No available slots for this bay.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingCalendar;