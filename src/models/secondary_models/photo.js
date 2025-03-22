const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  url: { 
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
  size_kb: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  }
}, { versionKey: false });

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = { Photo, PhotoSchema };