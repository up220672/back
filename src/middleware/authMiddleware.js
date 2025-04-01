const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajustar para coincidir con la estructura de tu token
    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: 'Estructura de token inválida'
      });
    }

    // Adjuntar información del usuario según tu token
    req.user = {
      id: decoded.userId,      // Usar userId en lugar de id
      role: decoded.role,
      nombre: decoded.nombre   // Opcional: incluir el nombre
    };

    next();
  } catch (error) {
    let message = 'Token inválido';
    if (error.name === 'TokenExpiredError') {
      message = 'Token expirado';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Token malformado';
    }

    res.status(401).json({ 
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = authMiddleware;