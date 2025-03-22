const mongoose = require('mongoose');

const AmountDetailsSchema = new mongoose.Schema({
  subtotal: { 
    type: Number, 
    required: false,
    default: null 
  },
  platformCommission: { 
    type: Number, 
    required: false,
    default: null 
  },
  tax: { 
    type: Number, 
    required: false,
    default: null 
  },
  total: { 
    type: Number, 
    required: false,
    default: null 
  },
  currency: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  }
}, { versionKey: false });

const AmountDetails = mongoose.model('AmountDetails', AmountDetailsSchema);

module.exports = { AmountDetails, AmountDetailsSchema };