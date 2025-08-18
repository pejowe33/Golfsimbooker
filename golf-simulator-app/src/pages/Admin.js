import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import BookingHistory from '../components/Admin/BookingHistory';
import LeagueManagement from '../components/Admin/LeagueManagement';
import CoachManagement from '../components/Admin/CoachManagement';
import DiscountCodes from '../components/Admin/DiscountCodes';
import Analytics from '../components/Admin/Analytics';

const Admin = () => {
    return (
        <div className="admin-page">
            <h1>Admin Panel</h1>
            <Switch>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/booking-history" component={BookingHistory} />
                <Route path="/admin/league-management" component={LeagueManagement} />
                <Route path="/admin/coach-management" component={CoachManagement} />
                <Route path="/admin/discount-codes" component={DiscountCodes} />
                <Route path="/admin/analytics" component={Analytics} />
            </Switch>
        </div>
    );
};

export default Admin;