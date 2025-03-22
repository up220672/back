const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
  adults: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  children: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  babies: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  pets: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  }
}, { versionKey: false });

const People = mongoose.model('People', PeopleSchema);

module.exports = { People, PeopleSchema };