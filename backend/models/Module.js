const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
