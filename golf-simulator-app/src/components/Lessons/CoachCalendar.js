import React, { useState, useEffect } from 'react';
import { fetchCoachesAvailability } from '../../utils/api';
import './CoachCalendar.css';

const CoachCalendar = () => {
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCoach, setSelectedCoach] = useState('');

    useEffect(() => {
        const loadAvailability = async () => {
            const data = await fetchCoachesAvailability(selectedDate);
            setAvailability(data);
        };
        loadAvailability();
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    const handleCoachChange = (event) => {
        setSelectedCoach(event.target.value);
    };

    return (
        <div className="coach-calendar">
            <h2>Coach Availability</h2>
            <input type="date" onChange={handleDateChange} />
            <select onChange={handleCoachChange}>
                <option value="">Select a Coach</option>
                {availability.coaches && availability.coaches.map(coach => (
                    <option key={coach.id} value={coach.id}>{coach.name}</option>
                ))}
            </select>
            <div className="availability-slots">
                {availability.slots && availability.slots.map(slot => (
                    <div key={slot.id} className={`slot ${slot.available ? 'available' : 'unavailable'}`}>
                        {slot.time}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoachCalendar;