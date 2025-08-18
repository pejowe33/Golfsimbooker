const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const authMiddleware = require('../middleware/auth');

// Get available lessons
router.get('/available', authMiddleware, async (req, res) => {
    try {
        // Logic to fetch available lessons
        const availableLessons = await Lesson.find({ available: true });
        res.json(availableLessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Book a lesson
router.post('/book', authMiddleware, async (req, res) => {
    const { lessonId, userId, date, time } = req.body;

    try {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Logic to book the lesson
        lesson.bookings.push({ userId, date, time });
        await lesson.save();

        res.status(201).json({ message: 'Lesson booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get lesson bookings for a user
router.get('/my-bookings', authMiddleware, async (req, res) => {
    try {
        const lessons = await Lesson.find({ 'bookings.userId': req.user.id });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Cancel a lesson booking
router.delete('/cancel/:lessonId', authMiddleware, async (req, res) => {
    const { lessonId } = req.params;

    try {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Logic to cancel the booking
        lesson.bookings = lesson.bookings.filter(booking => booking.userId !== req.user.id);
        await lesson.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;