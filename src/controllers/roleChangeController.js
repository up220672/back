const { RoleChangeRequest } = require('../models/roleChangeRequest');
const { User } = require('../models/user');
const errorHandler = require('../middleware/errorHandler');

// Solicitar cambio de rol

/**
 * @swagger
 * /role-change-request:
 *   post:
 *     summary: Request a role change
 *     tags: [RoleChange]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleChangeRequest'
 *     responses:
 *       201:
 *         description: Role change request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleChangeRequest'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
exports.requestRoleChange = async (req, res) => {
  try {
    const { user_id, requested_role, tax_document, proof_of_residence, criminal_record_certificate } = req.body;

    // Verificar si el usuario ya tiene una solicitud pendiente
    const existingRequest = await RoleChangeRequest.findOne({ user_id, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending role change request' });
    }

    // Crear una nueva solicitud de cambio de rol
    const roleChangeRequest = new RoleChangeRequest({
      user_id,
      requested_role,
      tax_document,
      proof_of_residence,
      criminal_record_certificate
    });
    await roleChangeRequest.save();

    res.status(201).json({ message: 'Role change request submitted successfully', roleChangeRequest });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

// Aprobar o rechazar cambio de rol

/**
 * @swagger
 * /role-change-request/{request_id}:
 *   put:
 *     summary: Approve or reject a role change request
 *     tags: [RoleChange]
 *     parameters:
 *       - in: path
 *         name: request_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleChangeRequest'
 *     responses:
 *       200:
 *         description: Role change request approved or rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleChangeRequest'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Role change request not found
 *       500:
 *         description: Internal server error
 */
exports.approveRoleChange = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status, is_tax_document_verified, is_proof_of_residence_verified, is_criminal_record_certificate_verified } = req.body;

    // Verificar si la solicitud existe
    const roleChangeRequest = await RoleChangeRequest.findById(request_id);
    if (!roleChangeRequest) {
      return res.status(404).json({ message: 'Role change request not found' });
    }

    // Actualizar el estado de la solicitud y los documentos verificados
    roleChangeRequest.status = status;
    roleChangeRequest.is_tax_document_verified = is_tax_document_verified;
    roleChangeRequest.is_proof_of_residence_verified = is_proof_of_residence_verified;
    roleChangeRequest.is_criminal_record_certificate_verified = is_criminal_record_certificate_verified;
    roleChangeRequest.updated_at = Date.now();
    await roleChangeRequest.save();

    // Si la solicitud es aprobada, actualizar el rol del usuario
    if (status === 'approved') {
      const user = await User.findById(roleChangeRequest.user_id);
      user.role = roleChangeRequest.requested_role;
      await user.save();
    }

    res.status(200).json({ message: `Role change request ${status} successfully`, roleChangeRequest });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

// Obtener todas las solicitudes de cambio de rol

/**
 * @swagger
 * /role-change-requests:
 *   get:
 *     summary: Get all role change requests
 *     tags: [RoleChange]
 *     responses:
 *       200:
 *         description: List of all role change requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleChangeRequest'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getAllRoleChangeRequests = async (req, res) => {
    try {
      const roleChangeRequests = await RoleChangeRequest.find();
      res.status(200).json(roleChangeRequests);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


// Eliminar una solicitud de cambio de rol por ID

/**
 * @swagger
 * /role-change-request/{request_id}:
 *   delete:
 *     summary: Delete a role change request by ID
 *     tags: [RoleChange]
 *     parameters:
 *       - in: path
 *         name: request_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The request ID
 *     responses:
 *       200:
 *         description: Role change request deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Role change request not found
 *       500:
 *         description: Internal server error
 */


  exports.deleteRoleChangeRequest = async (req, res) => {
    try {
      const { request_id } = req.params;
  
      // Verificar si la solicitud existe
      const roleChangeRequest = await RoleChangeRequest.findByIdAndDelete(request_id);
      if (!roleChangeRequest) {
        return res.status(404).json({ message: 'Role change request not found' });
      }
  
      res.status(200).json({ message: 'Role change request deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };