const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/payments',authMiddleware,validate, paymentController.getAllPayments);

router.get('/payments/:page', authMiddleware, validate, paymentController.getPaymentsByPage);

router.get(
    '/payment/:id',
        [param('id').isMongoId().withMessage('Invalid paymnets ID')] ,
    validate,
    paymentController.getPaymentById
);

router.post(
    '/payment',
    authMiddleware,
    [
        body('payment_method').notEmpty().withMessage('Payment method is required'),
        body('payment_date').notEmpty().withMessage('Payment date is required'),
        body('payment_amount').notEmpty().withMessage('Payment amount is required'),
        body('payment_status').notEmpty().withMessage('Payment status is required'),
        body('payment_description').notEmpty().withMessage('Payment description is required'),
        body('payment_currency').notEmpty().withMessage('Payment currency is required'),
        body('payment_receipt').notEmpty().withMessage('Payment receipt is required'),
        body('payment_receipt').isURL().withMessage('Payment receipt must be a valid URL')
    ],
    validate,
    paymentController.createPayment
);

router.put(
    '/payment/:id',
    authMiddleware,
    [
        param('id').isMongoId().withMessage('Invalid payment ID'),
        body('payment_method').notEmpty().withMessage('Payment method is required'),
        body('payment_date').notEmpty().withMessage('Payment date is required'),
        body('payment_amount').notEmpty().withMessage('Payment amount is required'),
        body('payment_status').notEmpty().withMessage('Payment status is required'),
        body('payment_description').notEmpty().withMessage('Payment description is required'),
        body('payment_currency').notEmpty().withMessage('Payment currency is required'),
        body('payment_receipt').notEmpty().withMessage('Payment receipt is required'),
        body('payment_receipt').isURL().withMessage('Payment receipt must be a valid URL')
    ],
    validate, 
    paymentController.updatePayment
);

router.delete(
    '/payment/:id',
    authMiddleware,
    [
        param('id').isMongoId().withMessage('Invalid payment ID')
    ],
    validate, 
    paymentController.deletePayment
);

module.exports = router;