const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  title: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  description: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  duration: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  width: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  height: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  format: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  size_mb: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  thumbnail_url: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  }
}, { versionKey: false });

const Video = mongoose.model('Video', VideoSchema);

module.exports = { Video, VideoSchema };