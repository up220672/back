const mongoose = require('mongoose');
const { BathroomAmenities } = require('./bathroomAmenities');
const PhotoSchema = require('./photo').PhotoSchema;
const VideoSchema = require('./video').VideoSchema;
const BathroomAmenitiesSchema = require('./bathroomAmenities').BathroomAmenitiesSchema;

const BathroomSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false,
    default: null,
    trim: true
  },
  privacy: { 
    type: Number, 
    required: false,
    default: null,
    min: 1,
    max: 3
  },
  width_m: { 
    type: Number, 
    required: false,
    default: null,
    min: 0
  },
  length_m: { 
    type: Number, 
    required: false,
    default: null,
    min: 0
  },
  accessible_for_wheelchairs: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  amenities: { 
    type: BathroomAmenitiesSchema, 
    required: false,
    default: BathroomAmenities
  },
  photos: { 
    type: [PhotoSchema], 
    required: false,
    default: null,
  },
  videos: { 
    type: [VideoSchema], 
    required: false,
    default: null 
  }
}, { versionKey: false });

const Bathroom = mongoose.model('Bathroom', BathroomSchema);

module.exports = { Bathroom, BathroomSchema };