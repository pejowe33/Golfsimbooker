const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerPerson: {
        type: Number,
        required: true,
    },
    dayOfWeek: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    numberOfWeeks: {
        type: Number,
        required: true,
    },
    maxTeams: {
        type: Number,
        required: true,
    },
    teamType: {
        type: String,
        enum: ['Single', 'Scramble 2 Man', 'Scramble 4 Man'],
        required: true,
    },
    matchType: {
        type: String,
        enum: ['Lowest Score', 'Match Play'],
        required: true,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    scores: [{
        week: {
            type: Number,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        matchPlayResult: {
            type: String,
            enum: ['Win', 'Tie', 'Loss'],
        },
    }],
});

module.exports = mongoose.model('League', leagueSchema);