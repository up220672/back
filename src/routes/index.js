const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const propertyRouter = require('./propertyRoutes');
const paymentRouter = require('./paymentRoutes');
const bookingRouter = require('./bookingRoutes');
const roleChangeRoutes = require('./roleChangeRoutes'); // Asegúrate de que el nombre del archivo sea correcto

router.use(authRouter);
router.use(userRouter);
router.use(propertyRouter);
router.use(paymentRouter);
router.use(bookingRouter);
router.use(roleChangeRoutes);

module.exports = router;