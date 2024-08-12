const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subject: { type: String, required: true },
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
