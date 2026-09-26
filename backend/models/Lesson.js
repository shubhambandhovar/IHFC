const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    instructor: { type: String },
    description: { type: String },
    thumbnail: { type: String },
    videoProvider: { type: String, enum: ['self-hosted', 'cloud-cdn'], default: 'self-hosted' },
    videoUrl: { type: String },
    duration: { type: String },
    lessonNumber: { type: Number, required: true },
    published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
