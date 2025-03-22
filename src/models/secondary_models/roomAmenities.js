const mongoose = require('mongoose');

const RoomAmenitiesSchema = new mongoose.Schema({
  tv: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  closet: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  air_conditioner: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  heater: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  fan: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  desk: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  mirror: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  lamps: { 
    type: Number, 
    required: false,
    default: false 
  },
  wifi: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  sofa: { 
    type: Number, 
    required: false,
    default: false 
  },
  curtains: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  blackout_curtains: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  mini_fridge: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  extra_blankets: { 
    type: Number, 
    required: false,
    default: false 
  },
  extra_pillows: { 
    type: Number, 
    required: false,
    default: false 
  },
  rug: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bookshelf: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  drawers: { 
    type: Number, 
    required: false,
    default: false 
  },
  power_outlets: { 
    type: Number, 
    required: false,
    default: false 
  },
  sound_system: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  alarm_clock: { 
    type: Boolean, 
    required: false,
    default: false 
  }
}, { versionKey: false });

const RoomAmenities = mongoose.model('RoomAmenities', RoomAmenitiesSchema);

module.exports = { RoomAmenities, RoomAmenitiesSchema };