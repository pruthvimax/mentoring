const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roles');
const { listAll, addHodReview } = require('../controllers/hodController');

// GET /api/hod/records -> list all mentoring records
router.get('/records', auth, roleCheck('hod'), listAll);

// POST /api/hod/review/:studentId/:recordId -> HOD review
router.post('/review/:studentId/:recordId', auth, roleCheck('hod'), addHodReview);

module.exports = router;
