const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middleware/admin');
const Booking = require('../models/Booking');
const League = require('../models/League');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

// Get booking history
router.get('/bookings', checkAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// Get leagues
router.get('/leagues', checkAdmin, async (req, res) => {
    try {
        const leagues = await League.find();
        res.json(leagues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leagues' });
    }
});

// Get lessons
router.get('/lessons', checkAdmin, async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('user');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons' });
    }
});

// Get all users
router.get('/users', checkAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Delete a booking
router.delete('/bookings/:id', checkAdmin, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
    }
});

// Delete a league
router.delete('/leagues/:id', checkAdmin, async (req, res) => {
    try {
        await League.findByIdAndDelete(req.params.id);
        res.json({ message: 'League deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting league' });
    }
});

// Delete a lesson
router.delete('/lessons/:id', checkAdmin, async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lesson' });
    }
});

// Export the router
module.exports = router;