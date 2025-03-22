const mongoose = require('mongoose');
const { AmountDetails } = require('./secondary_models/amountDetails');
const { CardPaymentMethod } = require('./secondary_models/cardPaymentMethod');
const AmountDetailsSchema = require('./secondary_models/amountDetails').AmountDetailsSchema;
const CardPaymentMethodSchema = require('./secondary_models/cardPaymentMethod').CardPaymentMethodSchema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - user_id
 *         - amount
 *         - method
 *         - status
 *         - payment_method
 *         - payment_date
 *         - payment_amount
 *         - payment_status
 *         - payment_description
 *         - payment_currency
 *         - payment_receipt
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the user
 *         amount:
 *           type: number
 *           description: Amount paid
 *         method:
 *           type: string
 *           description: Payment method
 *         status:
 *           type: string
 *           description: Payment status
 *         payment_method:
 *           type: string
 *           description: Payment method
 *         payment_date:
 *           type: string
 *           format: date-time
 *           description: Payment date
 *         payment_amount:
 *           type: number
 *           description: Payment amount
 *         payment_status:
 *           type: string
 *           description: Payment status
 *         payment_description:
 *           type: string
 *           description: Payment description
 *         payment_currency:
 *           type: string
 *           description: Payment currency
 *         payment_receipt:
 *           type: string
 *           description: Payment receipt
 *       example:
 *         user_id: "67a38828f3d566c1b439f452"
 *         amount: 150.5
 *         method: "Credit Card"
 *         status: "Completed"
 *         payment_method: "Credit Card"
 *         payment_date: "2023-10-01T00:00:00.000Z"
 *         payment_amount: 150.5
 *         payment_status: "Completed"
 *         payment_description: "Payment for booking"
 *         payment_currency: "USD"
 *         payment_receipt: "https://example.com/receipt/12345"
 */


const PaymentSchema = new mongoose.Schema({
  amount_details: { 
    type: AmountDetailsSchema,
    ref: 'AmountDetails',
    required: false,
    default: AmountDetails(),
  },
  card: { 
    type: CardPaymentMethodSchema, 
    ref: 'CardPaymentMethod',
    required: false,
    default: CardPaymentMethod(),
  },
  current_status: { 
    type: Number, 
    required: false,
    default: null 
  },
  created_at: { 
    type: Date, 
    required: false,
    default: Date.now 
  },
  confirmed_at: { 
    type: Date, 
    required: false,
    default: null 
  }
}, { versionKey: false });

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = { Payment, PaymentSchema };