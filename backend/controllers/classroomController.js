const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Create a new classroom
const createClassroom = async (req, res) => {
  try {
    const { name, startTime, endTime, days, teacherId, studentIds } = req.body;

    // Check if the teacher is already assigned to a classroom
    const existingClassroom = await Classroom.findOne({ teacher: teacherId });
    if (existingClassroom) {
      return res.status(400).json({ message: 'This teacher is already assigned to a classroom.' });
    }

    // Create the new classroom
    const newClassroom = new Classroom({
      name,
      startTime,
      endTime,
      days,
      teacher: teacherId,
      students: studentIds,
    });

    // Save the classroom to the database
    await newClassroom.save();

    // Update teacher's classroomId
    await User.findByIdAndUpdate(teacherId, { classroom: newClassroom._id });

    // Update students' classroomId
    await User.updateMany({ _id: { $in: studentIds } }, { classroom: newClassroom._id });

    res.status(201).json(newClassroom);
  } catch (error) {
    console.error('Error creating classroom:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all classrooms
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('teacher').populate('students');
    res.status(200).json(classrooms);
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createClassroom,
  getClassrooms,
};
