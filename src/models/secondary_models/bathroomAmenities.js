const mongoose = require('mongoose');

const BathroomAmenitiesSchema = new mongoose.Schema({
  shower: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  hot_water: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bathtub: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  toilet: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  sink: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  mirror: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  hair_dryer: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  towels: { 
    type: Number, 
    required: false,
    default: false 
  },
  toilet_paper: { 
    type: Number, 
    required: false,
    default: false 
  },
  soap: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  shampoo: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  conditioner: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  body_wash: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bathrobe: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  slippers: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  trash_bin: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  laundry_basket: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  heated_towel_rack: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bidet: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  hand_dryer: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  power_outlets: { 
    type: Number, 
    required: false,
    default: false 
  },
  plants: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  candles: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  aromatherapy: { 
    type: Boolean, 
    required: false,
    default: false 
  }
}, { versionKey: false });

const BathroomAmenities = mongoose.model('BathroomAmenities', BathroomAmenitiesSchema);

module.exports = { BathroomAmenities, BathroomAmenitiesSchema };