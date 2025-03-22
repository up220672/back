const mongoose = require('mongoose');

const BedsSchema = new mongoose.Schema({
  king_size: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  queen_size: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  single: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  sofa_bed: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  bunk_beds: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  cradle: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  }
}, { versionKey: false });

const Beds = mongoose.model('Beds', BedsSchema);

module.exports = { Beds, BedsSchema };