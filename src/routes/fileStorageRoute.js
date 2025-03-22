const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileStorageController');
const { uploadImage, uploadVideo } = require('../middleware/fileStorage');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de subida
router.post('/upload/photo', 
  authMiddleware,
  ...uploadImage,
  controller.uploadPhoto
);

router.post('/upload/video', 
  authMiddleware,
  ...uploadVideo,
  controller.uploadVideo
);

// Rutas de eliminación
router.delete('/delete/photo/:fileName', 
  authMiddleware,
  controller.deletePhoto
);

router.delete('/delete/video/:fileName', 
  authMiddleware,
  controller.deleteVideo
);

module.exports = router;