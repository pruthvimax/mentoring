require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const staffRoutes = require('./routes/staff');
const hodRoutes = require('./routes/hod');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);        // student CRUD & records
app.use('/api/staff', staffRoutes);            // staff review endpoints
app.use('/api/hod', hodRoutes);                // hod review endpoints

app.get('/', (req, res) => res.send('Smart Mentoring Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
