const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleChangeRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - requested_role
 *         - status
 *         - tax_document
 *         - proof_of_residence
 *         - criminal_record_certificate
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user requesting the role change
 *         requested_role:
 *           type: number
 *           description: The role requested by the user
 *         status:
 *           type: string
 *           enum: ['pending', 'approved', 'rejected']
 *           description: The status of the role change request
 *         tax_document:
 *           type: string
 *           description: The tax document provided by the user
 *         is_tax_document_verified:
 *           type: boolean
 *           description: Whether the tax document is verified
 *         proof_of_residence:
 *           type: string
 *           description: The proof of residence provided by the user
 *         is_proof_of_residence_verified:
 *           type: boolean
 *           description: Whether the proof of residence is verified
 *         criminal_record_certificate:
 *           type: string
 *           description: The criminal record certificate provided by the user
 *         is_criminal_record_certificate_verified:
 *           type: boolean
 *           description: Whether the criminal record certificate is verified
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the request was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the request was last updated
 *       example:
 *         user_id: "67a38828f3d566c1b439f452"
 *         requested_role: 1
 *         status: "pending"
 *         tax_document: "https://example.com/documents/tax_document.pdf"
 *         is_tax_document_verified: false
 *         proof_of_residence: "https://example.com/documents/proof_of_residence.pdf"
 *         is_proof_of_residence_verified: false
 *         criminal_record_certificate: "https://example.com/documents/criminal_record_certificate.pdf"
 *         is_criminal_record_certificate_verified: false
 *         created_at: "2025-03-08T00:00:00.000Z"
 *         updated_at: "2025-03-08T00:00:00.000Z"
 */

const RoleChangeRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requested_role: {
    type: Number,
    required: true,
    enum: [1] // Solo permitimos solicitudes para cambiar a rol 1
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  tax_document: {
    type: String,
    required: true
  },
  is_tax_document_verified: {
    type: Boolean,
    required: false,
    default: null
  },
  proof_of_residence: {
    type: String,
    required: true
  },
  is_proof_of_residence_verified: {
    type: Boolean,
    required: false,
    default: null
  },
  criminal_record_certificate: {
    type: String,
    required: true
  },
  is_criminal_record_certificate_verified: {
    type: Boolean,
    required: false,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

const RoleChangeRequest = mongoose.model('RoleChangeRequest', RoleChangeRequestSchema);

module.exports = { RoleChangeRequest };