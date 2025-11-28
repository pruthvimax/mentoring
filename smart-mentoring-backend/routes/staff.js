const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roles');
const { listRecent, addMentorReview } = require('../controllers/staffController');

// GET /api/staff/submissions  -> list recent submissions (staff/hod)
router.get('/submissions', auth, roleCheck('staff','hod'), listRecent);

// POST /api/staff/review/:studentId/:recordId  -> add mentor remarks
router.post('/review/:studentId/:recordId', auth, roleCheck('staff'), addMentorReview);

module.exports = router;
