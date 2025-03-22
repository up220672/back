const jwt = require('jsonwebtoken');
const User = require('../models/user').User;

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user || user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Please authenticate' });
    }
  };
};

module.exports = roleMiddleware;