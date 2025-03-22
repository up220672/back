const mongoose = require('mongoose');
const { Address } = require('./address');
const AddressSchema = require('./address').AddressSchema;

const CardPaymentMethodSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  last4: { 
    type: String, 
    required: false,
    default: null,
    trim: true,
    minlength: 4,
    maxlength: 4 
  },
  card_type: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  expiration_date: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  address: { 
    type: AddressSchema, 
    required: false,
    default: Address()
  }
}, { versionKey: false });

const CardPaymentMethod = mongoose.model('CardPaymentMethod', CardPaymentMethodSchema);

module.exports = { CardPaymentMethod, CardPaymentMethodSchema };