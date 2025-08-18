import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/admin/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/bookings/${id}`);
            setBookings(bookings.filter(booking => booking.id !== id));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div>
            <h1>Booking History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Booking Type</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Date</th>
                        <th>Bay Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.type}</td>
                            <td>{booking.name}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.email}</td>
                            <td>{booking.startTime}</td>
                            <td>{booking.endTime}</td>
                            <td>{booking.date}</td>
                            <td>{booking.bayNumber}</td>
                            <td><button>Edit</button></td>
                            <td><button onClick={() => handleDelete(booking.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory;