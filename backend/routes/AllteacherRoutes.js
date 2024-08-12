const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure path is correct
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all teachers
router.get('/', protect, authorize('Principal'), async (req, res) => {
  try {
    const teachers = await User.find({ role: 'Teacher' });
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update teacher details
router.put('/:id', protect, authorize('Principal'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const teacher = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete teacher
router.delete('/:id', protect, authorize('Principal'), async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await User.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
