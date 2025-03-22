const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const roleChangeController = require('../controllers/roleChangeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Ruta para que los usuarios soliciten un cambio de rol
router.post(
  '/role-change-request',
  authMiddleware,
  [
    body('user_id').isMongoId().withMessage('Invalid user ID'),
    body('requested_role').isInt({ min: 1, max: 1 }).withMessage('Requested role must be 1'),
    body('tax_document').isString().withMessage('Tax document must be a string'),
    body('proof_of_residence').isString().withMessage('Proof of residence must be a string'),
    body('criminal_record_certificate').isString().withMessage('Criminal record certificate must be a string')
  ],
  validate,
  roleChangeController.requestRoleChange
);

// Ruta para que los administradores aprueben o rechacen una solicitud de cambio de rol
router.put(
  '/role-change-request/:request_id',
  authMiddleware,
  roleMiddleware(0), // Solo los administradores con rol 0 pueden aprobar o rechazar solicitudes
  [
    param('request_id').isMongoId().withMessage('Invalid request ID'),
    body('status').isIn(['approved', 'rejected']).withMessage('Status must be either approved or rejected'),
    body('is_tax_document_verified').isBoolean().withMessage('Tax document verification status must be a boolean'),
    body('is_proof_of_residence_verified').isBoolean().withMessage('Proof of residence verification status must be a boolean'),
    body('is_criminal_record_certificate_verified').isBoolean().withMessage('Criminal record certificate verification status must be a boolean')
  ],
  validate,
  roleChangeController.approveRoleChange
);

// Ruta para obtener todas las solicitudes de cambio de rol
router.get(
  '/role-change-requests',
  authMiddleware,
  roleChangeController.getAllRoleChangeRequests
);

// Ruta para eliminar una solicitud de cambio de rol por ID
router.delete(
  '/role-change-request/:request_id',
  authMiddleware,
  roleMiddleware(0), // Solo los administradores con rol 0 pueden eliminar solicitudes
  [
    param('request_id').isMongoId().withMessage('Invalid request ID')
  ],
  validate,
  roleChangeController.deleteRoleChangeRequest
);

module.exports = router;