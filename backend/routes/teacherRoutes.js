// routes/teacherRoutes.js
const express = require('express');
const { createTimetable } = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/timetable', protect, authorize('Teacher'), createTimetable);

module.exports = router;
