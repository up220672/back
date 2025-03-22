const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  type: {
    type: Number,     // 2 for password reset, 1 for account confirmation
    required: true,
  },
}, { versionKey: false });

const Code = mongoose.model('Code', CodeSchema);

module.exports = { Code, CodeSchema };