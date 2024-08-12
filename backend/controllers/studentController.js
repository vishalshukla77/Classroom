const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Get students for a specific student's classroom
const getStudentsForStudent = async (req, res) => {
  try {
    const studentId = req.user._id; // Assuming student ID is available in req.user from auth middleware

    // Find the student's classroom
    const classroom = await Classroom.findOne({ students: studentId }).populate('students');
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Return students in the student's classroom
    res.status(200).json(classroom.students);
  } catch (error) {
    console.error('Error fetching students for student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentsForStudent,
};
