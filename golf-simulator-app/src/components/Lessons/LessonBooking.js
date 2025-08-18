import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LessonBooking = () => {
    const [coaches, setCoaches] = useState([]);
    const [selectedCoach, setSelectedCoach] = useState('');
    const [date, setDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingConfirmation, setBookingConfirmation] = useState(null);

    useEffect(() => {
        // Fetch coaches from the API
        const fetchCoaches = async () => {
            try {
                const response = await axios.get('/api/coaches');
                setCoaches(response.data);
            } catch (error) {
                console.error('Error fetching coaches:', error);
            }
        };

        fetchCoaches();
    }, []);

    const handleCoachChange = (e) => {
        setSelectedCoach(e.target.value);
        // Fetch available time slots for the selected coach and date
        fetchTimeSlots(e.target.value, date);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        // Fetch available time slots for the selected coach and date
        fetchTimeSlots(selectedCoach, e.target.value);
    };

    const fetchTimeSlots = async (coachId, selectedDate) => {
        if (coachId && selectedDate) {
            try {
                const response = await axios.get(`/api/lessons/availability?coachId=${coachId}&date=${selectedDate}`);
                setTimeSlots(response.data);
            } catch (error) {
                console.error('Error fetching time slots:', error);
            }
        }
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleBooking = async () => {
        try {
            const response = await axios.post('/api/lessons/book', {
                coachId: selectedCoach,
                date,
                time: selectedTime,
            });
            setBookingConfirmation(response.data);
        } catch (error) {
            console.error('Error booking lesson:', error);
        }
    };

    return (
        <div>
            <h2>Book a Lesson</h2>
            <div>
                <label>Coach:</label>
                <select value={selectedCoach} onChange={handleCoachChange}>
                    <option value="">Select a coach</option>
                    {coaches.map(coach => (
                        <option key={coach.id} value={coach.id}>{coach.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={handleDateChange} />
            </div>
            <div>
                <label>Time:</label>
                <select value={selectedTime} onChange={handleTimeChange}>
                    <option value="">Select a time</option>
                    {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleBooking}>Book Lesson</button>
            {bookingConfirmation && (
                <div>
                    <h3>Booking Confirmation</h3>
                    <p>{bookingConfirmation.message}</p>
                </div>
            )}
        </div>
    );
};

export default LessonBooking;