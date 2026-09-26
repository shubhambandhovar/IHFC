const express = require('express');
const router = express.Router();
const { 
    getModules, 
    updateProgress,
    adminGetModules,
    createModule,
    createLesson,
    updateLesson 
} = require('../controllers/learningController');
const { protect, admin } = require('../middleware/authMiddleware');

// Student Routes
router.route('/modules').get(protect, getModules);
router.route('/progress').post(protect, updateProgress);

// Admin Routes
router.route('/admin/modules')
    .get(protect, admin, adminGetModules)
    .post(protect, admin, createModule);

router.route('/admin/lessons')
    .post(protect, admin, createLesson);

router.route('/admin/lessons/:id')
    .put(protect, admin, updateLesson);

module.exports = router;
