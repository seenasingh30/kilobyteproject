const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "demo"
    },
    catagoery: {
        type: String,
        default: "demo"
    },
    address: {
        type: Array,
        default: []
    },
    price: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('catalog', userSchema);