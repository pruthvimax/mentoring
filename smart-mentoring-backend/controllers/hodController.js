const MentoringRecord = require('../models/MentoringRecord');

exports.listAll = async (req, res) => {
  try {
    const recs = await MentoringRecord.find({}).sort('-createdAt').populate('student', 'name usn department');
    res.json(recs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addHodReview = async (req, res) => {
  try {
    const { studentId, recordId } = req.params;
    const rec = await MentoringRecord.findOne({ _id: recordId, student: studentId });
    if(!rec) return res.status(404).json({ message: 'Record not found' });

    rec.hodRemarks = req.body.hodRemarks || rec.hodRemarks;
    rec.hodSignature = req.body.hodSignature || rec.hodSignature;
    rec.approved = req.body.approved === true || req.body.approved === 'true';
    rec.hodReviewedAt = Date.now();
    await rec.save();
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
