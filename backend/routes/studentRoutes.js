const express = require('express');
const router = express.Router();
const { getStudentsForStudent } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to get students for the logged-in student
router.get('/students', protect, authorize('Student'), getStudentsForStudent);

module.exports = router;
