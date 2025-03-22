const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - guest_id
 *         - property_id
 *         - host_id
 *         - current_payment_id
 *         - check_in
 *         - check_out
 *         - guests
 *         - total_price
 *         - is_active
 *       properties:
 *         guest_id:
 *           type: string
 *           description: ID of the user
 *         property_id:
 *           type: string
 *           description: ID of the property
 *         host_id:
 *           type: string
 *           description: ID of the host
 *         current_payment_id:
 *           type: string
 *           description: ID of the current payment
 *         check_in:
 *           type: string
 *           format: date-time
 *           description: Check-in date
 *         check_out:
 *           type: string
 *           format: date-time
 *           description: Check-out date
 *         guests:
 *           type: integer
 *           description: Number of guests
 *         pets:
 *           type: integer
 *           description: Number of pets
 *         total_price:
 *           type: number
 *           description: Total price of the booking
 *         is_active:
 *           type: boolean
 *           description: Whether the booking is active
 *       example:
 *         guest_id: "67a38828f3d566c1b439f452"
 *         property_id: "67a3a14093b48e5f9dc669e4"
 *         host_id: "67a3837cfa79c07c35147897"
 *         current_payment_id: "67a39f542caa0a3d3740e7aa"
 *         check_in: "2023-10-01T00:00:00.000Z"
 *         check_out: "2023-10-10T00:00:00.000Z"
 *         guests: 2
 *         pets: 1
 *         total_price: 500.00
 *         is_active: true
 */


const BookingSchema = new mongoose.Schema({
  current_payment_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Payment', // Reference to the Payment model
    required: true,
    default: null
  },
  payment_history: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Payment', // Reference to the Payment model
      required: true,
      default: null 
    },
  ],
  guest_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true,
    default: null 
  },
  property_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property', // Reference to the Property model
    required: true,
    default: null 
  },
  host_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true,
    default: null 
  },
  check_in: { 
    type: Date, 
    required: true,
    default: null 
  },
  check_out: { 
    type: Date, 
    required: false,
    default: null 
  },
  guests: { 
    type: Number, 
    required: true,
    default: 0,
    min: 1 
  },
  pets: { 
    type: Number, 
    required: false,
    default: 0,
    min: 0 
  },
  created_at: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  is_active: { 
    type: Boolean,
    required: true,
    default: true 
  }
}, { versionKey: false });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = { Booking, BookingSchema };