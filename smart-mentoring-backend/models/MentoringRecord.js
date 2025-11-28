const mongoose = require('mongoose');

const mentoringRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  semester: { type: String },
  sgpa: { type: String },
  attendance: { type: String },
  backlogs: { type: String },
  achievements: { type: String },
  strengths: { type: String },
  weaknesses: { type: String },
  academicIssues: { type: String },
  personalIssues: { type: String },
  goals: { type: String },

  // Mentor fields
  mentorRemarks: { type: String },
  mentorSignature: { type: String },
  mentorReviewedAt: { type: Date },

  // HOD fields
  hodRemarks: { type: String },
  hodSignature: { type: String },
  approved: { type: Boolean, default: false },
  hodReviewedAt: { type: Date },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

mentoringRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MentoringRecord', mentoringRecordSchema);
