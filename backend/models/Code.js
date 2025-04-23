const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  result: {
    label: Number,
    total: Number,
    vulnerabilities: [
      {
        cve_id: String,
        description: String,
        line_number: Number,
      }
    ],
    analysis_time_sec: Number,
    lines_analyzed: Number,
  },
  errorCount: {
    type: Number,
    required: false,
  },
  linesAnalyzed: {
    type: Number,
    required: false,
  },
  analysisTime: {
    type: Number, // in seconds
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Code', CodeSchema);
