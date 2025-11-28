const MentoringRecord = require('../models/MentoringRecord');
const User = require('../models/User');

exports.listRecent = async (req, res) => {
  try {
    // staff and hod can list all - optionally filter by department
    let query = {};
    if(req.query.department) {
      // join via student to filter by department (simple approach)
      const students = await User.find({ department: req.query.department, role: 'student' }).select('_id');
      query.student = { $in: students.map(s=>s._id) };
    }
    const recs = await MentoringRecord.find(query).sort('-createdAt').limit(50).populate('student', 'name usn department');
    res.json(recs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMentorReview = async (req, res) => {
  try {
    // only staff (or hod) can add mentor remarks - guard in route
    const { studentId, recordId } = req.params;
    const rec = await MentoringRecord.findOne({ _id: recordId, student: studentId });
    if(!rec) return res.status(404).json({ message: 'Record not found' });

    rec.mentorRemarks = req.body.mentorRemarks || rec.mentorRemarks;
    rec.mentorSignature = req.body.mentorSignature || req.mentorSignature;
    rec.mentorReviewedAt = Date.now();
    await rec.save();
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
