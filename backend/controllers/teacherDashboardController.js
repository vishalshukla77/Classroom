// controllers/teacherController.js
const User = require('../models/User');
const Classroom = require('../models/Classroom');

// Get students for a specific teacher
const getStudentsForTeacher = async (req, res) => {
  try {
    const teacherId = req.user._id; // Assuming teacher ID is available in req.user from auth middleware

    // Find the teacher's classroom
    const classroom = await Classroom.findOne({ teacher: teacherId }).populate('students');
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Return students in the teacher's classroom
    res.status(200).json(classroom.students);
  } catch (error) {
    console.error('Error fetching students for teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentsForTeacher,
};
