const express = require('express');
const router = express.Router();
const propertyDraftController = require('../controllers/propertyDraftController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener o crear un borrador para una propiedad existente
router.get('/property/:property_id', authMiddleware, propertyDraftController.getOrCreateDraft);

// Obtener un borrador por su ID
router.get('/:id', authMiddleware, propertyDraftController.getDraftById);

// Crear un borrador vacío para una nueva propiedad
router.post('/property/empty', authMiddleware, propertyDraftController.createEmptyPropertyDraft);

// Actualizar un borrador existente
router.put('/property/:id', authMiddleware, propertyDraftController.updatePropertyDraft);

// Crear un borrador a partir de una propiedad guardada
router.post('/property/from-property/:property_id', authMiddleware, propertyDraftController.createPropertyDraftFromSavedProperty);

// Guardar un borrador en una propiedad existente
router.post('/property/:id/save-to-property', authMiddleware, propertyDraftController.savePropertyDraftIntoProperty);

// Guardar un borrador como una nueva propiedad
router.post('/property/:id/save-to-new-property', authMiddleware, propertyDraftController.savePropertyDraftIntoNewProperty);

// Descartar los cambios de un borrador y volver a cargar los datos de la propiedad original
router.post('/property/:id/discard', authMiddleware, propertyDraftController.discardDraftChanges);

// Subir una imagen o video a un borrador
router.post('/:id/upload-media', authMiddleware, propertyDraftController.addImageOrVideoToDraft);

// Eliminar una imagen o video de un borrador
router.delete('/:id/delete-media', authMiddleware, propertyDraftController.deleteImageOrVideoFromDraft);

router.get('/user/all', authMiddleware, propertyDraftController.getAllDraftsByUser);
router.get('/user/not-in-review', authMiddleware, propertyDraftController.getDraftsNotInReviewByUser);
router.get('/user/in-review', authMiddleware, propertyDraftController.getDraftsInReviewByUser);

module.exports = router;