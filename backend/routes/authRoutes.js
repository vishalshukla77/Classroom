// routes/authRoutes.js
const express = require('express');
const { login, signupRestricted } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', protect, authorize('Principal', 'Teacher'), signupRestricted);

module.exports = router;
