const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: "demo"
    },
    products: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('kart', userSchema);