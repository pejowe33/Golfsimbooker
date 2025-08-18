import React from 'react';
import LessonBooking from '../components/Lessons/LessonBooking';
import CoachCalendar from '../components/Lessons/CoachCalendar';

const Lessons = () => {
    return (
        <div>
            <h1>Lessons</h1>
            <LessonBooking />
            <CoachCalendar />
        </div>
    );
};

export default Lessons;