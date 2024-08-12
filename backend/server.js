const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const principalRoutes = require('./routes/principalRoutes');
const teacherRoutes = require('./routes/teacherDashboardRoute');
const studentRoutes = require('./routes/studentRoutes');
const { protect, authorize } = require('./middleware/authMiddleware');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const AllteacherRoutes = require('./routes/AllteacherRoutes');
const AllstudentRoutes = require('./routes/AllstudentsRoutes');
const classroomRoutes = require('./routes/classoomRoutes');


dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Pre-create the principal account if it doesn't exist
const preCreatePrincipal = async () => {
  const principalEmail = 'principal@classroom.com';
  const existingPrincipal = await User.findOne({ email: principalEmail });

  if (!existingPrincipal) {
    const principalPassword = 'Admin';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(principalPassword, salt);

    const principal = new User({
      name: 'Principal',
      email: principalEmail,
      password: hashedPassword,
      role: 'Principal',
    });

    await principal.save();
    console.log('Principal account created');
  } else {
    console.log('Principal account already exists');
  }
};

// Initialize pre-creation of the principal account
preCreatePrincipal();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/principal', protect, authorize('Principal'), principalRoutes);
app.use('/api/teacher', protect, authorize('Teacher'), teacherRoutes);
app.use('/api/student', protect, authorize('Student'), studentRoutes);
app.use('/api/teachers', protect, authorize('Principal'), AllteacherRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/students', AllstudentRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
