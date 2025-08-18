const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    availability: [{
        day: {
            type: String,
            required: true
        },
        timeSlots: [{
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            }
        }]
    }],
    picture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Coach', coachSchema);