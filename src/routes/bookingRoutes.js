const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');


router.post(
  '/booking',
  authMiddleware,
  [
    body('current_payment_id').notEmpty().withMessage('Current payment id is required'),
    body('guest_id').notEmpty().withMessage('Guest id is required'),
    body('host_id').notEmpty().withMessage('Host id is required'),
    body('property_id').notEmpty().withMessage('Property id is required'),
    body('check_in').notEmpty().withMessage('Check in date is required'),
    body('check_out').notEmpty().withMessage('Check out date is required'),
    body('total_price').notEmpty().withMessage('Total price is required'),
    body('is_active').notEmpty().withMessage('Is active is required'),
  ],
  validate,
  bookingController.createBooking
);

router.get(
  '/booking/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid booking ID')
  ],
  validate,
  bookingController.getBooking
);

router.put(
  '/booking/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('current_payment_id').notEmpty().withMessage('Current payment id is required'),
    body('guest_id').notEmpty().withMessage('Guest id is required'),
    body('host_id').notEmpty().withMessage('Host id is required'),
    body('property_id').notEmpty().withMessage('Property id is required'),
    body('check_in').notEmpty().withMessage('Check in date is required'),
    body('check_out').notEmpty().withMessage('Check out date is required'),
    body('total_price').notEmpty().withMessage('Total price is required'),
    body('is_active').notEmpty().withMessage('Is active is required'),
  ],
  validate,
  bookingController.updateBooking
);

router.delete(
  '/booking/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid booking ID')
  ],
  validate,
  bookingController.deleteBooking
);

router.get(
  '/bookings',
  authMiddleware,
  validate,
  bookingController.getAllBookings
);


router.get(
  '/booking/:id/payment',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid booking ID')
  ],
  validate,
  bookingController.getPaymentFromBookingID
);

// Export the router
module.exports = router;