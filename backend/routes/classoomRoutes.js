const express = require('express');
const router = express.Router();
const { createClassroom, getClassrooms } = require('../controllers/classroomController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes for classroom operations
router.post('/create', protect, authorize('Principal'), createClassroom);
router.get('/', protect, getClassrooms);

module.exports = router;
