// controllers/principalController.js
const User = require('../models/User');
const Classroom = require('../models/Classroom');

exports.createClassroom = async (req, res) => {
  const { name, startTime, endTime, days } = req.body;

  try {
    const classroom = new Classroom({
      name,
      startTime,
      endTime,
      days
    });

    await classroom.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.assignTeacherToClassroom = async (req, res) => {
  const { teacherId, classroomId } = req.body;

  try {
    const teacher = await User.findById(teacherId);

    if (!teacher || teacher.role !== 'Teacher') {
      return res.status(400).json({ msg: 'Invalid teacher' });
    }

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(400).json({ msg: 'Classroom not found' });
    }

    if (classroom.teacher) {
      return res.status(400).json({ msg: 'Classroom already has a teacher' });
    }

    classroom.teacher = teacher._id;
    await classroom.save();

    teacher.classroom = classroom._id;
    await teacher.save();

    res.json({ msg: 'Teacher assigned to classroom', classroom });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.assignStudentToTeacher = async (req, res) => {
  const { studentId, classroomId } = req.body;

  try {
    const student = await User.findById(studentId);

    if (!student || student.role !== 'Student') {
      return res.status(400).json({ msg: 'Invalid student' });
    }

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(400).json({ msg: 'Classroom not found' });
    }

    student.classroom = classroom._id;
    await student.save();

    classroom.students.push(student._id);
    await classroom.save();

    res.json({ msg: 'Student assigned to classroom', classroom });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

