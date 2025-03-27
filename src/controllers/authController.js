const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user').User;
const Code = require('../models/secondary_models/codes').Code;
const RefreshToken = require('../models/refreshToken');
const { generateRandomCode } = require('../services/code_generator');
const { sentEmail } = require('../services/email');
const errorHandler = require('../middleware/errorHandler');

// Function to handle errors
//const errorHandler = (res, error, statusCode = 500) => {
//  res.status(statusCode).json({ message: error.message });
//};

// Function to generate JWT token
const generateToken = (userId, nombre, role) => jwt.sign({ userId, nombre, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Function to check if user exists
const checkUserExists = async (email) => User.findOne({ email });

// Function to hash password
const hashPassword = async (password) => bcrypt.hash(password, 10);

// Function to generate refresh token
const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return new RefreshToken({ token: refreshToken, userId }).save();
};

// Function to check if user is active
const checkUserActive = async (user_id) => {
  const user = await User.findById(user_id);
  if (!user || !user.is_active) {
    return null;
  }
  return user;
};

// Register

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or bad request
 *       500:
 *         description: Server error
 */
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the user already exists
    const existingUser = await checkUserExists(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new User({ username, email, password_hash: hashedPassword, role: 0 });

    // Save the user in the database
    await user.save();

    // Generate a verification code
    const verificationCode = generateRandomCode();
    const expirationDate = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now

    // Save the verification code in the database
    const code = new Code({
      code: verificationCode,
      expiration_date: expirationDate,
      type: 1, // 1 for account confirmation
    });
    await code.save();

    // Add the code to the user's valid codes
    user.valid_codes.push(code);
    await user.save();

    // Send the verification code by email using the template
    await sentEmail({
      email: user.email,
      subject: 'Account Verification',
      templateName: 'verifyEmail',
      placeholders: {
        code: verificationCode,
      },
    });

    // Generate a JWT token (access token)
    const token = generateToken(user._id, user.username, user.role);

    // Generate a refresh token
    const refreshToken = await generateRefreshToken(user._id);

    // Send the response
    res.status(201).json({
      message: 'User registered successfully. Please check your email for the verification code.',
      token,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

// Login

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the user exists
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = generateToken(user._id, user.username, user.role);
    // Generate a refresh token
    const refreshToken = await generateRefreshToken(user._id);

    // Send the response
    res.status(200).json({ message: 'Login successful', token, refreshToken: refreshToken.token });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Refresh token

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh the access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid refresh token
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (user) {
      const newToken = generateToken(user._id, user.username, user.role);
      res.status(200).json({ token: newToken });
    } else {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  } catch (error) {
    next(error);
  }
};

// Request Password Reset

/**
 * @swagger
 * /request-password-reset:
 *   post:
 *     summary: Request a password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *             example:
 *               email: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Password reset code sent to your email
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email' });
    }

    // Check if the user exists
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Generate a reset code
    const resetCode = generateRandomCode();
    const expirationDate = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now

    // Save the reset code in the database
    const code = new Code({
      code: resetCode,
      expiration_date: expirationDate,
      type: 2, // 2 for password reset
    });
    await code.save();

    // Add the code to the user's valid codes
    user.valid_codes.push(code);
    await user.save();

    // Send the reset code by email using the template
    await sentEmail({
      email: user.email,
      subject: 'Password Reset',
      templateName: 'resetPassword',
      placeholders: {
        code: resetCode,
      },
    });

    res.status(200).json({ message: 'Password reset code sent to your email' });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Reset Password

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               code:
 *                 type: string
 *                 description: The reset code
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *             example:
 *               email: "john.doe@example.com"
 *               code: "12345678"
 *               newPassword: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired code
 *       500:
 *         description: Server error
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the user exists
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the code is valid
    const validCode = user.valid_codes.find((c) => c.code === code && c.type === 2);
    if (!validCode || validCode.expiration_date < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password
    user.password_hash = hashedPassword;
    user.valid_codes = user.valid_codes.filter((c) => c.code !== code); // Remove the used code
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Verify Email

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify a user's email using a verification code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               code:
 *                 type: string
 *                 description: The verification code
 *             example:
 *               email: "john.doe@example.com"
 *               code: "12345678"
 *     responses:
 *       200:
 *         description: Email verification successful
 *       400:
 *         description: Invalid or expired code
 *       500:
 *         description: Server error
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the user exists
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the code is valid
    const validCode = user.valid_codes.find((c) => c.code === code && c.type === 1);
    if (!validCode || validCode.expiration_date < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    // Mark the email as verified
    user.email_verified = true;
    user.valid_codes = user.valid_codes.filter((c) => c.code !== code); // Remove the used code
    await user.save();

    res.status(200).json({ message: 'Email verification successful' });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Resend Verification Code

/**
 * @swagger
 * /resend-verification-code:
 *   post:
 *     summary: Resend the email verification code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *             example:
 *               email: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Verification code resent successfully
 *       400:
 *         description: User does not exist or email already verified
 *       500:
 *         description: Server error
 */
exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email' });
    }

    // Check if the user exists
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the email is already verified
    if (user.email_verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate a new verification code
    const verificationCode = generateRandomCode();
    const expirationDate = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now

    // Save the verification code in the database
    const code = new Code({
      code: verificationCode,
      expiration_date: expirationDate,
      type: 1, // 1 for account confirmation
    });
    await code.save();

    // Add the code to the user's valid codes
    user.valid_codes.push(code);
    await user.save();

    // Send the verification code by email using the template
    await sentEmail({
      email: user.email,
      subject: 'Account Verification',
      templateName: 'verifyEmail',
      placeholders: {
        code: verificationCode,
      },
    });

    res.status(200).json({ message: 'Verification code resent successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Verify Token

exports.verifyToken = async (req, res) => {
  try {
    const { token, type } = req.body;

    if (!token || !type) {
      return res.status(400).json({ message: 'Token and type are required' });
    }

    let secret;
    if (type === 'access') {
      secret = process.env.JWT_SECRET;
    } else if (type === 'refresh') {
      secret = process.env.JWT_REFRESH_SECRET;
    } else {
      return res.status(400).json({ message: 'Invalid token type' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      return res.status(200).json({ valid: true, decoded });
    } catch (error) {
      return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};