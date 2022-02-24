var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: 'user',
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: "Customer"
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('users', userSchema);