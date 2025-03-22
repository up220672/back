const mongoose = require('mongoose');
const AddressSchema = require('./secondary_models/address').AddressSchema;
const NotificationSchema = require('./secondary_models/notification.js').NotificationSchema;
const CodeSchema = require('./secondary_models/codes.js').CodeSchema;



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: "john_doe"
 *         email: "john.doe@example.com"
 *         password: "password123"
 */

const UserSchema = new mongoose.Schema({

  username: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  first_name: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  last_name: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  description_markdown: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  email: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  email_verified: {
    type: Boolean,
    required: false,
    default: false
  },
  phone: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  password_hash: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  role: { 
    type: Number, 
    required: false,
    default: 2,
    min: 0,
    max: 2 
  },
  profile_picture: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  date_of_birth: { 
    type: Date, 
    required: false,
    default: null 
  },
  language: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  address: { 
    type: AddressSchema, 
    required: false,
    default: null 
  },
  currency: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  created_at: { 
    type: Date, 
    required: false,
    default: null,
    default: Date.now 
  },
  last_login: { 
    type: Date, 
    required: false,
    default: null,
    default: Date.now 
  },
  is_active: { 
    type: Boolean, 
    required: false,
    default: true 
  },
  identity_document: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_identity_document_verified: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  tax_document: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_tax_document_verified: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  proof_of_residence: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_proof_of_residence_verified: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  criminal_record_certificate: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_criminal_record_certificate_verified: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  properties: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    required: false,
    default: null 
  }],
  notifications: [{ 
    type: NotificationSchema, 
    required: false,
    default: null 
  }],
  valid_codes: [{
    type: CodeSchema,
    required: false,
    default: null
  }],
}, { versionKey: false });

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };