const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const User = require('../models/User');

// Enroll in a membership
router.post('/enroll', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const membership = new Membership({
            userId: user._id,
            startDate: new Date(),
            hoursUsed: 0,
        });

        await membership.save();
        res.status(201).json({ message: 'Membership enrolled successfully', membership });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in membership', error });
    }
});

// Get membership details
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const membership = await Membership.findOne({ userId });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching membership details', error });
    }
});

// Update membership hours used
router.patch('/:userId/use-hours', async (req, res) => {
    const { userId } = req.params;
    const { hours } = req.body;

    try {
        const membership = await Membership.findOne({ userId });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        membership.hoursUsed += hours;
        await membership.save();
        res.status(200).json({ message: 'Membership hours updated successfully', membership });
    } catch (error) {
        res.status(500).json({ message: 'Error updating membership hours', error });
    }
});

// Cancel membership
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const membership = await Membership.findOneAndDelete({ userId });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        res.status(200).json({ message: 'Membership canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling membership', error });
    }
});

module.exports = router;