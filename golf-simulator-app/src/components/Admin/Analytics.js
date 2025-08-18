import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
    const [utilizationData, setUtilizationData] = useState([]);
    const [coachPerformanceData, setCoachPerformanceData] = useState([]);
    const [bookingRevenueData, setBookingRevenueData] = useState([]);

    useEffect(() => {
        fetchUtilizationData();
        fetchCoachPerformanceData();
        fetchBookingRevenueData();
    }, []);

    const fetchUtilizationData = async () => {
        try {
            const response = await axios.get('/api/admin/utilization');
            setUtilizationData(response.data);
        } catch (error) {
            console.error('Error fetching utilization data:', error);
        }
    };

    const fetchCoachPerformanceData = async () => {
        try {
            const response = await axios.get('/api/admin/coach-performance');
            setCoachPerformanceData(response.data);
        } catch (error) {
            console.error('Error fetching coach performance data:', error);
        }
    };

    const fetchBookingRevenueData = async () => {
        try {
            const response = await axios.get('/api/admin/booking-revenue');
            setBookingRevenueData(response.data);
        } catch (error) {
            console.error('Error fetching booking revenue data:', error);
        }
    };

    return (
        <div>
            <h1>Analytics Dashboard</h1>
            <section>
                <h2>Utilization</h2>
                <ul>
                    {utilizationData.map((data, index) => (
                        <li key={index}>{data.day}: {data.utilizationPercentage}%</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Coach Performance</h2>
                <ul>
                    {coachPerformanceData.map((data, index) => (
                        <li key={index}>{data.coachName}: {data.lessonsBooked} lessons</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Booking Revenue</h2>
                <ul>
                    {bookingRevenueData.map((data, index) => (
                        <li key={index}>{data.month}: ${data.revenue}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Analytics;