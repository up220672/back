const mongoose = require('mongoose');
const { RoomAmenities } = require('./roomAmenities');
const PhotoSchema = require('./photo').PhotoSchema;
const VideoSchema = require('./video').VideoSchema;
const BathroomSchema = require('./bathroom').BathroomSchema;
const BedsSchema = require('./beds').BedsSchema;
const RoomAmenitiesSchema = require('./roomAmenities').RoomAmenitiesSchema;

const BedroomSchema = new mongoose.Schema({
  name: { 
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
  beds: { 
    type: BedsSchema, 
    required: false,
    default: null 
  },
  amenities: { 
    type: RoomAmenitiesSchema, 
    required: false,
    default: RoomAmenities()
  },
  bathroom: { 
    type: BathroomSchema, 
    required: false,
    default: null 
  },
  windows: { 
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
  length: { 
    type: Number, 
    required: false,
    default: null,
    min: 0
  },
  balcony: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  view: { 
    type: String, 
    required: false,
    default: null,
    trim: true
  },
  soundproof_windows: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  max_guests: { 
    type: Number, 
    required: false,
    default: null,
    min: 1
  },
  photos: { 
    type: [PhotoSchema], 
    required: false,
    default: null 
  },
  videos: { 
    type: [VideoSchema], 
    required: false,
    default: null 
  }
}, { versionKey: false });

const Bedroom = mongoose.model('Bedroom', BedroomSchema);

module.exports = { Bedroom, BedroomSchema };