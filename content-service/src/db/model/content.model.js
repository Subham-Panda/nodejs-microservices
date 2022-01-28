const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contentSchema = new mongoose.Schema({
    inc_id: {
        type: Number,
    },
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

contentSchema.plugin(AutoIncrement, {inc_field: 'inc_id'});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;