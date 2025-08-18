const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

module.exports = GiftCard;