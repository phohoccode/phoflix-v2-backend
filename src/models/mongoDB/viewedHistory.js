const mongoose = require('mongoose');

const viewedHistory = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    type_account: {
        type: String,
        required: true,
    },
    movies: [{
        type: mongoose.Schema.Types.Mixed
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = viewedHistory