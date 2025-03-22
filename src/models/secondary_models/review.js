const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: false,
    default: null 
  },
  booking_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: false,
    default: null 
  },
  score: { 
    type: Number, 
    required: false,
    default: null,
    min: 1,
    max: 5 
  },
  comment: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  date: { 
    type: Date, 
    required: false,
    default: null,
    default: Date.now 
  }
}, { versionKey: false });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review, ReviewSchema };