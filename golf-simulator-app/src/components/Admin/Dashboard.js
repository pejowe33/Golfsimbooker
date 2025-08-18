import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-links">
                <h2>Manage Bookings</h2>
                <Link to="/admin/booking-history">View Booking History</Link>
                <Link to="/admin/booking-calendar">Booking Calendar</Link>

                <h2>Manage Leagues</h2>
                <Link to="/admin/league-management">League Management</Link>

                <h2>Manage Coaches</h2>
                <Link to="/admin/coach-management">Coach Management</Link>

                <h2>Discount Codes</h2>
                <Link to="/admin/discount-codes">Manage Discount Codes</Link>

                <h2>Analytics</h2>
                <Link to="/admin/analytics">View Analytics</Link>
            </div>
        </div>
    );
};

export default Dashboard;