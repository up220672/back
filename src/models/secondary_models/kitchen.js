const mongoose = require('mongoose');
const { KitchenAmenities } = require('./kitchenAmenities');
const PhotoSchema = require('./photo').PhotoSchema;
const VideoSchema = require('./video').VideoSchema;
const KitchenAmenitiesSchema = require('./kitchenAmenities').KitchenAmenitiesSchema;

const KitchenSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false,
    default: null,
    trim: true
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
  amenities: { 
    type: KitchenAmenitiesSchema, 
    required: false,
    default: KitchenAmenities()
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

const Kitchen = mongoose.model('Kitchen', KitchenSchema);

module.exports = { Kitchen, KitchenSchema };