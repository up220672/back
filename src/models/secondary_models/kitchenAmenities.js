const mongoose = require('mongoose');

const KitchenAmenitiesSchema = new mongoose.Schema({
  refrigerator: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  stove: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  oven: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  microwave: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  dishwasher: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  sink: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  counter_space: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  coffee_maker: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  toaster: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  kettle: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  blender: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  cutlery: { 
    type: Number, 
    required: false,
    default: false 
  },
  plates: { 
    type: Number, 
    required: false,
    default: false 
  },
  bowls: { 
    type: Number, 
    required: false,
    default: false 
  },
  glasses: { 
    type: Number, 
    required: false,
    default: false 
  },
  pots_and_pans: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  cooking_utensils: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  spices: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  salt: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  pepper: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  trash_bin: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  recycling_bin: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  paper_towels: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  cleaning_supplies: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  power_outlets: { 
    type: Number, 
    required: false,
    default: false 
  }
}, { versionKey: false });

const KitchenAmenities = mongoose.model('KitchenAmenities', KitchenAmenitiesSchema);

module.exports = { KitchenAmenities, KitchenAmenitiesSchema };