const Payment = require('../models/payment').Payment;

//get all payments
/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).send(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /payments/{page}:
 *   get:
 *     summary: Get payments by page
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getPaymentsByPage = async (req, res) => {
  const page = req.params.page;
  const limit = 10; // cantidad de payments por página

  try {
    const payments = await Payment.find({ is_active: true })
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(payments);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get payment by id
/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Get payment by id
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the payment
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      res.status(200).send(payment);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//create payment
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//update payment
/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Update payment by id
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      res.status(200).send(payment);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete payment
/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete payment by id
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the payment
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      res.status(200).send({ message: 'Payment deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};