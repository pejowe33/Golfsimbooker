const express = require('express');
const router = express.Router();
const GiftCard = require('../models/GiftCard');

// Create a new gift card
router.post('/', async (req, res) => {
    const { amount } = req.body;
    try {
        const newGiftCard = new GiftCard({ amount });
        await newGiftCard.save();
        res.status(201).json(newGiftCard);
    } catch (error) {
        res.status(500).json({ message: 'Error creating gift card', error });
    }
});

// Get all gift cards
router.get('/', async (req, res) => {
    try {
        const giftCards = await GiftCard.find();
        res.status(200).json(giftCards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gift cards', error });
    }
});

// Get a specific gift card by ID
router.get('/:id', async (req, res) => {
    try {
        const giftCard = await GiftCard.findById(req.params.id);
        if (!giftCard) {
            return res.status(404).json({ message: 'Gift card not found' });
        }
        res.status(200).json(giftCard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gift card', error });
    }
});

// Update a gift card
router.put('/:id', async (req, res) => {
    try {
        const updatedGiftCard = await GiftCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGiftCard) {
            return res.status(404).json({ message: 'Gift card not found' });
        }
        res.status(200).json(updatedGiftCard);
    } catch (error) {
        res.status(500).json({ message: 'Error updating gift card', error });
    }
});

// Delete a gift card
router.delete('/:id', async (req, res) => {
    try {
        const deletedGiftCard = await GiftCard.findByIdAndDelete(req.params.id);
        if (!deletedGiftCard) {
            return res.status(404).json({ message: 'Gift card not found' });
        }
        res.status(200).json({ message: 'Gift card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gift card', error });
    }
});

module.exports = router;