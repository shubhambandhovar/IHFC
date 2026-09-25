const User = require('../models/User');

const getStudents = async (req, res) => {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
};

module.exports = { getStudents };
