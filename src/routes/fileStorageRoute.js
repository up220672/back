const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileStorageController');
const { uploadImage, uploadVideo, uploadPDF, uploadTemp } = require('../middleware/fileStorage');
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

router.post('/upload/pdf', 
  authMiddleware,
  ...uploadPDF,
  controller.uploadPDF
);

router.post('/upload/temp', 
  authMiddleware,
  ...uploadTemp,
  controller.uploadTemp
);

router.post('/confirm', 
  authMiddleware,
  controller.confirmFile
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

router.delete('/delete/pdf/:fileName', 
  authMiddleware,
  controller.deletePDF
);

module.exports = router;