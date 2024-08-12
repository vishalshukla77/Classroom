// routes/principalRoutes.js
const express = require('express');
const {
  createClassroom,
  assignTeacherToClassroom,
  assignStudentToTeacher
} = require('../controllers/principalController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/classroom', protect, authorize('Principal'), createClassroom);
router.post('/assign-teacher', protect, authorize('Principal'), assignTeacherToClassroom);
router.post('/assign-student', protect, authorize('Principal'), assignStudentToTeacher);


module.exports = router;
