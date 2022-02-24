const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: "demo"
    },
    items: {
        type: Array,
        default: []
    },
    delevry_personid: {
        type: String,
        default: "demo"
    },
    locations: {
        type: Array,
        default: []
    },
    stages: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('order', userSchema);