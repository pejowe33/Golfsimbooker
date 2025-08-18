import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Leagues from './pages/Leagues';
import Lessons from './pages/Lessons';
import GiftCards from './pages/GiftCards';
import Membership from './pages/Membership';
import Admin from './pages/Admin';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/booking" component={Booking} />
                <Route path="/leagues" component={Leagues} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/giftcards" component={GiftCards} />
                <Route path="/membership" component={Membership} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </Router>
    );
};

export default App;