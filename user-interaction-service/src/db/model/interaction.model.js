const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    liked_users: {
        type: [String],
        default: []
    },
    read_users: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
});

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;