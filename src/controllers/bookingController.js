const Booking = require('../models/booking').Booking;

const checkBookingActive = async (user_id) => {
  const booking = await Booking.findById(user_id);
  if (!booking || !booking.is_active) {
    return null;
  }
  return booking;
};

// Create a new booking for the first time
/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

exports.createBooking = async (req, res) => {
  try {
    const { current_payment_id, ...rest } = req.body;

    const booking = new Booking({
      ...rest,
      current_payment_id,
      payment_history: [current_payment_id]
    });

    await booking.save();

    // Populate the references
    const populatedBooking = await Booking.findById(booking._id)
      .populate('current_payment_id')
      .populate('guest_id')
      .populate('property_id')
      .populate('host_id');

    res.status(201).send(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get booking by id only if is_active is true

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get booking by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the booking
 *     responses:
 *       200:
 *         description: Booking retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */

exports.getBooking = async (req, res) => {
  try {
    const booking = await checkBookingActive(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found or inactive' });
    }

    // Populate the references
    const populatedBooking = await Booking.findById(booking._id)
      .populate('current_payment_id')
      .populate('guest_id')
      .populate('property_id')
      .populate('host_id');

    res.send(populatedBooking);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update booking by id 
// Update only the fields that are sent in the request

/**
 * @swagger
 * /booking/{id}:
 *   put:
 *     summary: Update booking by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */

exports.updateBooking = async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const booking = await checkBookingActive(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found or inactive' });
    }

    updates.forEach((update) => booking[update] = req.body[update]);
    await booking.save();

    // Populate the references
    const populatedBooking = await Booking.findById(booking._id)
      .populate('current_payment_id')
      .populate('guest_id')
      .populate('property_id')
      .populate('host_id');

    res.send(populatedBooking);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Set is_active to false instead of deleting booking by id

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete booking by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the booking
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await checkBookingActive(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found or inactive' });
    }

    booking.is_active = false;
    await booking.save();

    // Populate the references
    const populatedBooking = await Booking.findById(booking._id)
      .populate('current_payment_id')
      .populate('guest_id')
      .populate('property_id')
      .populate('host_id');

    res.send({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all bookings

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 * 
 *       500:
 *        description: Server error
 */

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ is_active: true });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get payment from booking by id
/**
 * @swagger
 * /booking/{id}/payment:
 *   get:
 *     summary: Get payment from booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the booking
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */

exports.getPaymentFromBookingID = async (req, res) => {
  try {
    const booking = await checkBookingActive(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found or inactive' });
    }

    // Populate the references
    const populatedBooking = await Booking.findById(booking._id)
      .populate('current_payment_id')
      .populate('guest_id')
      .populate('property_id')
      .populate('host_id');

    res.send(populatedBooking.current_payment_id);
  } catch (error) {
    res.status(500).send(error);
  }
};