const User = require('../models/user').User;

const checkUserActive = async (user_id) => {
  const user = await User.findById(user_id);
  if (!user || !user.is_active) {
    return null;
  }
  return user;
};

// Create a new user

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    // Eliminar el campo valid_codes de la respuesta
    const userObject = user.toObject();
    delete userObject.valid_codes;
    res.status(201).send(userObject);    
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get user by id only if is_active is true

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
exports.getUser = async (req, res) => {
  try {
    const user = await checkUserActive(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }
    // Eliminar el campo valid_codes de la respuesta
    const userObject = user.toObject();
    delete userObject.valid_codes;    
    res.send(userObject);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * @swagger
 * /users/{page}:
 *   get:
 *     summary: Get users by page
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getUsersByPage = async (req, res) => {
  const page = req.params.page;
  const limit = 10; // cantidad de users por página

  try {
    const users = await User.find({ is_active: true })
      .skip((page - 1) * limit)
      .limit(limit);

    for (let i = 0; i < users.length; i++) {
      // Eliminar el campo valid_codes de la respuesta
      const userObject = users[i].toObject();
      delete userObject.valid_codes;
      users[i] = userObject;
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update user by id 
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const user = await checkUserActive(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }

    updates.forEach((update) => {
      if (update !== 'password_hash') {
        user[update] = req.body[update];
      }
    });
    await user.save();
    // Eliminar el campo valid_codes de la respuesta
    const userObject = user.toObject();
    delete userObject.valid_codes;    
    res.send(userObject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Check if user exists by email
exports.checkUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email, is_active: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }
    // Eliminar el campo valid_codes de la respuesta
    const userObject = user.toObject();
    delete userObject.valid_codes;    
    res.send(userObject);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Set is_active to false instead of deleting user by id
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await checkUserActive(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }

    user.is_active = false;
    await user.save();
    res.send({message: 'User deleted successfully'});
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all users

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ is_active: true });

    for (let i = 0; i < users.length; i++) {
      // Eliminar el campo valid_codes de la respuesta
      const userObject = users[i].toObject();
      delete userObject.valid_codes;
      users[i] = userObject;
    }

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all users with role

/**
 * @swagger
 * /users/{type}:
 *   get:
 *     summary: Get all users by role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user role (1, 2, or 3)
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getAllUsersByRole = async (req, res) => {
  try {
    const users = await User.find({ role: req.params.type, is_active: true });

    for (let i = 0; i < users.length; i++) {
      // Eliminar el campo valid_codes de la respuesta
      const userObject = users[i].toObject();
      delete userObject.valid_codes;
      users[i] = userObject;
    }

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Send notification to user by id

/**
 * @swagger
 * /user/notification:
 *   post:
 *     summary: Send notification to user by ID
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID
 *               notification:
 *                 type: string
 *                 description: The notification message
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
exports.sendNotification = async (req, res) => {
  try {
    const { user_id, type, title, icon, message, entity_type, entity_id, long_message } = req.body;

    // Find the user
    const user = await checkUserActive(user_id);
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }

    // Check if there are more than 2 read notifications
    const readNotifications = user.notifications.filter(n => n.is_read);
    if (readNotifications.length > 2) {
      const notificationsToKeep = readNotifications.slice(-2); // Keep the last 2 read notifications
      user.notifications = user.notifications.filter(n => !n.is_read || notificationsToKeep.includes(n));
    }

    // Create the new notification
    const notification = {
      user_id,
      type,
      title,
      icon,
      message,
      entity_type,
      entity_id,
      long_message,
      is_read: false // Ensure the new notification is unread
    };

    // Add the new notification to the user's notifications
    user.notifications.push(notification);
    await user.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark notification as read

/**
 * @swagger
 * /user/notification/{id}:
 *   put:
 *     summary: Mark notification as read by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
exports.markNotificationAsRead = async (req, res) => {
  try {
    const user_id = req.params.id; // Correctly obtain user_id from req.params.id
    const { notification_id } = req.body;

    // Find the user
    const user = await checkUserActive(user_id);
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }

    // Find the notification
    const notification = user.notifications.id(notification_id);
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }

    // Mark the notification as read
    notification.is_read = true;
    await user.save();
    res.send(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all notifications for a user

/**
 * @swagger
 * /user/notifications/{id}:
 *   get:
 *     summary: Get all notifications by user ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The notification ID
 *                   userId:
 *                     type: string
 *                     description: The user ID
 *                   notification:
 *                     type: string
 *                     description: The notification message
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
exports.getNotificationsByUser = async (req, res) => {
  try {
    const user = await checkUserActive(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found or inactive' });
    }
    res.send(user.notifications);
  } catch (error) {
    res.status(500).send(error);
  }
};