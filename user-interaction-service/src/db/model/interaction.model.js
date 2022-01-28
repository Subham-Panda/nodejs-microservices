const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const interactionSchema = new mongoose.Schema({
    inc_id:{
        type: Number,
    },
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

interactionSchema.plugin(AutoIncrement, {inc_field: 'inc_id'});

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;