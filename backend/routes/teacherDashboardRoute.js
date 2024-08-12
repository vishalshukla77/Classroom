const express = require('express');
const router = express.Router();
const { getStudentsForTeacher } = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to get students for the logged-in teacher
router.get('/students', protect, authorize('Teacher'), getStudentsForTeacher);

module.exports = router;
