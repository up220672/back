const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post(
  '/user',
  authMiddleware,
  roleMiddleware(3000),
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('password_hash').notEmpty().withMessage('Password hash is required'),
    body('role').isInt({ min: 0 }).withMessage('Role must be 0, 1, 2, or 3000')
  ],
  validate,
  userController.createUser
);

router.get(
  '/user/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid user ID')
  ],
  validate,
  userController.getUser
);

router.put(
  '/user/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('first_name').optional().notEmpty().withMessage('First name is required'),
    body('last_name').optional().notEmpty().withMessage('Last name is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('phone').optional().notEmpty().withMessage('Phone number is required'),
    body('password_hash').optional().notEmpty().withMessage('Password hash is required'),
    body('role').optional().isInt({ min: 0 }).withMessage('Role must be 0, 1, 2, or 3000')
  ],
  validate,
  userController.updateUser
);

router.delete(
  '/user/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid user ID')
  ],
  validate,
  userController.deleteUser
);

router.get('/users', authMiddleware, validate, userController.getAllUsers);

router.get('/users/:page', authMiddleware, validate, userController.getUsersByPage);

router.get(
  '/users/:type',
  authMiddleware,
  [
    param('type').isInt({ min: 0, max: 2 }).withMessage('Role must be 0, 1, or 2')
  ],
  validate,
  userController.getAllUsersByRole
);

router.post(
  '/user/notification',
  authMiddleware,
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('notification').notEmpty().withMessage('Notification message is required')
  ],
  validate,
  userController.sendNotification
);

router.put(
  '/user/notification/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid notification ID')
  ],
  validate,
  userController.markNotificationAsRead
);

router.get(
  '/user/notifications/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid user ID')
  ],
  validate,
  userController.getNotificationsByUser
);

module.exports = router;