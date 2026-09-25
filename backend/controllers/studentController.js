const User = require('../models/User');
const Payment = require('../models/Payment');

const getStudentProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const getStudentPayments = async (req, res) => {
    const payments = await Payment.find({ user: req.user._id });
    res.json(payments);
};

const getLearningPath = async (req, res) => {
    const learningPath = [
        { id: 1, title: 'Program Induction', description: 'Step into a unique learning experience', status: 'completed' },
        { id: 2, title: 'Python Refresher With AI', description: 'Essential programming skills', status: 'completed' },
        { id: 3, title: 'Applied Data Science With Python', description: 'Data science principles', status: 'in-progress' },
        { id: 4, title: 'Machine Learning', description: 'ML fundamentals and frameworks', status: 'pending' },
        { id: 5, title: 'Deep Learning Specialization', description: 'Neural networks and deep learning', status: 'pending' },
        { id: 6, title: 'GenAI Literacy', description: 'Foundational GenAI applications', status: 'pending' },
        { id: 7, title: 'Advanced Generative AI', description: 'Large language models and architectures', status: 'pending' },
        { id: 8, title: 'Capstone Project', description: 'Real-world business challenge', status: 'pending' }
    ];
    res.json(learningPath);
};

module.exports = { getStudentProfile, getStudentPayments, getLearningPath };
