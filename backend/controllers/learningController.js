const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

// @desc    Get all published modules and their lessons
// @route   GET /api/learning/modules
// @access  Private
const getModules = async (req, res) => {
    try {
        const modules = await Module.find({ published: true }).sort('order');
        const modulesWithLessons = await Promise.all(modules.map(async (mod) => {
            const lessons = await Lesson.find({ module: mod._id, published: true }).sort('lessonNumber');
            return {
                ...mod._doc,
                lessons
            };
        }));
        res.json(modulesWithLessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user progress for a lesson
// @route   POST /api/learning/progress
// @access  Private
const updateProgress = async (req, res) => {
    const { lessonId, moduleId, completed, playbackPosition } = req.body;
    try {
        const user = await User.findById(req.user._id);
        
        const existingProgressIndex = user.lessonProgress.findIndex(
            p => p.lesson.toString() === lessonId
        );

        if (existingProgressIndex >= 0) {
            user.lessonProgress[existingProgressIndex].playbackPosition = playbackPosition;
            user.lessonProgress[existingProgressIndex].lastWatchedAt = new Date();
            if (completed) {
                user.lessonProgress[existingProgressIndex].completed = true;
            }
        } else {
            user.lessonProgress.push({
                lesson: lessonId,
                module: moduleId,
                completed: completed || false,
                playbackPosition: playbackPosition || 0,
                lastWatchedAt: new Date()
            });
        }

        await user.save();
        res.json(user.lessonProgress);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- ADMIN ROUTES ---

// @desc    Admin Get all modules
// @route   GET /api/learning/admin/modules
// @access  Private/Admin
const adminGetModules = async (req, res) => {
    try {
        const modules = await Module.find().sort('order');
        const modulesWithLessons = await Promise.all(modules.map(async (mod) => {
            const lessons = await Lesson.find({ module: mod._id }).sort('lessonNumber');
            return {
                ...mod._doc,
                lessons
            };
        }));
        res.json(modulesWithLessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Admin Create Module
// @route   POST /api/learning/admin/modules
// @access  Private/Admin
const createModule = async (req, res) => {
    try {
        const module = new Module(req.body);
        const savedModule = await module.save();
        res.status(201).json(savedModule);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Admin Create Lesson
// @route   POST /api/learning/admin/lessons
// @access  Private/Admin
const createLesson = async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        const savedLesson = await lesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Admin Update Lesson
// @route   PUT /api/learning/admin/lessons/:id
// @access  Private/Admin
const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getModules,
    updateProgress,
    adminGetModules,
    createModule,
    createLesson,
    updateLesson
};
