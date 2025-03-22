const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: false,
    default: null 
  },
  type: { 
    type: String, 
    required: true,
    default: null,
    trim: true 
  },
  title: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  icon: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  message: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_read: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  entity_type: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  entity_id: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  long_message: { 
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
  updated_at: { 
    type: Date, 
    required: false,
    default: null,
    default: Date.now 
  }
}, { versionKey: false });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification, NotificationSchema };