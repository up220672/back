const mongoose = require('mongoose');
const PropertySchema = require('./property').PropertySchema;

const PropertyDraftSchema = new mongoose.Schema({
  original_property_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property', 
    required: false, 
    default: null 
  }, // Referencia a la propiedad original (si existe)
  draft_data: { 
    type: PropertySchema, 
    required: true 
  }, // Datos del borrador
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Usuario asociado al borrador
  is_in_review: { 
    type: Boolean, 
    default: false 
  }, // Indica si el borrador está en revisión
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
}, { versionKey: false });

const PropertyDraft = mongoose.model('PropertyDraft', PropertyDraftSchema);

module.exports = { PropertyDraft, PropertyDraftSchema };