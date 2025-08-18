const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    bayNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    numberOfPeople: {
        type: Number,
        required: true,
        min: 1
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    bookingType: {
        type: String,
        enum: ['league', 'booking', 'lesson'],
        required: true
    },
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);