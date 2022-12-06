const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    permissions: {
        type: Array,
        default: [0001],
    }
});

module.exports = mongoose.model('User', userSchema);