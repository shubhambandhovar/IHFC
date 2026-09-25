const express = require('express');
const router = express.Router();
const { getStudents } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/students').get(protect, admin, getStudents);

module.exports = router;
