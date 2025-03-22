const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validation');

const router = express.Router();


router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  validate,
  authController.register
);


router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  authController.login
);


router.post(
  '/request-password-reset',
  [
    body('email').isEmail().withMessage('Valid email is required')
  ],
  validate,
  authController.requestPasswordReset
);


router.post(
  '/reset-password',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('code').notEmpty().withMessage('Reset code is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
  ],
  validate,
  authController.resetPassword
);


router.post(
  '/verify-email',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('code').notEmpty().withMessage('Verification code is required')
  ],
  validate,
  authController.verifyEmail
);


router.post(
  '/resend-verification-code',
  [
    body('email').isEmail().withMessage('Valid email is required')
  ],
  validate,
  authController.resendVerificationCode
);


router.post(
  '/refresh-token',
   [
  body('token').notEmpty().withMessage('Refresh token is required')
   ],
   validate,
   authController.refreshToken
  );

module.exports = router;