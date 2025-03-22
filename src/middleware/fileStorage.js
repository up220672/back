const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configuración común
const generateUniqueName = (originalName) => 
  `${uuidv4()}${path.extname(originalName)}`;

const createStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public', folder));
  },
  filename: (req, file, cb) => cb(null, generateUniqueName(file.originalname))
});

// Filtros de tipo
const fileFilter = (allowedTypes) => (req, file, cb) => 
  allowedTypes.includes(file.mimetype) 
    ? cb(null, true)
    : cb(new Error(`Tipo de archivo no permitido. Permitidos: ${allowedTypes.join(', ')}`), false);

// Configuraciones
const imageUploader = multer({
  storage: createStorage('images'),
  fileFilter: fileFilter(['image/jpeg', 'image/png', 'image/gif']),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const videoUploader = multer({
  storage: createStorage('videos'),
  fileFilter: fileFilter(['video/mp4', 'video/quicktime']),
  limits: { fileSize: 100 * 1024 * 1024 }
});

// Manejo de errores
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ 
      success: false, 
      message: err.message || 'Error al subir el archivo' 
    });
  }
  next();
};

module.exports = {
  uploadImage: [imageUploader.single('file'), handleUploadErrors],
  uploadVideo: [videoUploader.single('file'), handleUploadErrors]
};