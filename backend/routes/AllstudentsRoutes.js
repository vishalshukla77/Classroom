// routes/students.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure path is correct
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all students
router.get('/', protect, authorize('Principal'), async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update student details
router.put('/:id', protect, authorize('Principal'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const student = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete student
router.delete('/:id', protect, authorize('Principal'), async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
