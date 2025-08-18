const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const leagueRoutes = require('./routes/leagues');
const lessonRoutes = require('./routes/lessons');
const giftCardRoutes = require('./routes/giftcards');
const membershipRoutes = require('./routes/membership');
const adminRoutes = require('./routes/admin');
const { mongoURI } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/giftcards', giftCardRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/admin', adminRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});