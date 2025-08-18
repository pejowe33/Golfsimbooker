const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { checkAuth } = require('../middleware/auth');

// Get all bookings
router.get('/', checkAuth, async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new booking
router.post('/', checkAuth, async (req, res) => {
    const { date, bays, numberOfPeople, time, userId } = req.body;

    const newBooking = new Booking({
        date,
        bays,
        numberOfPeople,
        time,
        userId,
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a booking
router.patch('/:id', checkAuth, async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a booking
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;