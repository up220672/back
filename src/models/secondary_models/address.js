const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  exterior_number: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  interior_number: { 
    type: String, 
    trim: true 
  },
  neighborhood: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  city: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  state: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  postal_code: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  country: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  references: { 
    type: String, 
    trim: true 
  },
  latitude: { 
    type: Number, 
    required: false,
    default: null 
  },
  longitude: { 
    type: Number, 
    required: false,
    default: null 
  }
}, { versionKey: false });

const Address = mongoose.model('Address', AddressSchema);

module.exports = { Address, AddressSchema };