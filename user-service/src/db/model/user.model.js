const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, 'Invalid Phone Number'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;