const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    story: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;