const express = require('express');
const router = express.Router();
const League = require('../models/League');
const authMiddleware = require('../middleware/auth');

// Get all leagues
router.get('/', async (req, res) => {
    try {
        const leagues = await League.find();
        res.json(leagues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new league
router.post('/', authMiddleware, async (req, res) => {
    const league = new League({
        name: req.body.name,
        pricePerPerson: req.body.pricePerPerson,
        dayOfWeek: req.body.dayOfWeek,
        time: req.body.time,
        durationWeeks: req.body.durationWeeks,
        maxTeams: req.body.maxTeams,
        description: req.body.description,
        teamType: req.body.teamType,
        matchType: req.body.matchType,
    });

    try {
        const newLeague = await league.save();
        res.status(201).json(newLeague);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a league
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const league = await League.findById(req.params.id);
        if (!league) return res.status(404).json({ message: 'League not found' });

        Object.assign(league, req.body);
        const updatedLeague = await league.save();
        res.json(updatedLeague);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a league
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const league = await League.findById(req.params.id);
        if (!league) return res.status(404).json({ message: 'League not found' });

        await league.remove();
        res.json({ message: 'League deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;