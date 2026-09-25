const express = require('express');
const router = express.Router();
const { getStudentProfile, getStudentPayments, getLearningPath } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getStudentProfile);
router.route('/payments').get(protect, getStudentPayments);
router.route('/learning-path').get(protect, getLearningPath);

module.exports = router;
