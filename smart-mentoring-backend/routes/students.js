const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roles');
const {
  createRecord,
  getRecordsForStudent,
  updateRecord,
  getRecord
} = require('../controllers/studentController');

// Create a mentoring record: POST /api/students/:studentId/records
router.post('/:studentId/records', auth, roleCheck('student'), createRecord);

// Get all records for a student: GET /api/students/:studentId/records
router.get('/:studentId/records', auth, roleCheck('student','staff','hod'), getRecordsForStudent);

// Update a student's own record: PUT /api/students/:studentId/records/:recordId
router.put('/:studentId/records/:recordId', auth, roleCheck('student'), updateRecord);

// Get single record: GET /api/students/:studentId/records/:recordId
router.get('/:studentId/records/:recordId', auth, roleCheck('student','staff','hod'), getRecord);

module.exports = router;
