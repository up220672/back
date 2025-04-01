const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { body, param } = require('express-validator'); // Importar param desde express-validator
const validate = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');


router.post(
    '/property',
    authMiddleware,
    
    [
        body('is_active').notEmpty().withMessage('Is active is required'),
        body('type').notEmpty().withMessage('Type is required'),
        body('title').notEmpty().withMessage('Title is required'),
        body('markdown_description').notEmpty().withMessage('Markdown description is required'),
        body('max_guests').notEmpty().withMessage('Max guests is required'),
        body('max_babies').notEmpty().withMessage('Max babies is required'),
        body('proof_of_address').notEmpty().withMessage('Proof of address is required'),
        body('is_proof_of_address_verified').notEmpty().withMessage('Is proof of address verified is required'),
        body('land_use_permit').notEmpty().withMessage('Land use permit is required'),
        body('is_land_use_permit_verified').notEmpty().withMessage('Is land use permit verified is required'),
    ],
    validate,
    propertyController.addNewProperty
);

router.put(
    '/property/:id',
    authMiddleware,
    [   
        param('id').isMongoId().withMessage('Invalid property ID'),
        body('is_active').notEmpty().withMessage('Is active is required'),
        body('type').notEmpty().withMessage('Type is required'),
        body('title').notEmpty().withMessage('Title is required'),
        body('markdown_description').notEmpty().withMessage('Markdown description is required'),
        body('max_guests').notEmpty().withMessage('Max guests is required'),
        body('max_babies').notEmpty().withMessage('Max babies is required'),
        body('proof_of_address').notEmpty().withMessage('Proof of address is required'),
        body('is_proof_of_address_verified').notEmpty().withMessage('Is proof of address verified is required'),
        body('land_use_permit').notEmpty().withMessage('Land use permit is required'),
        body('is_land_use_permit_verified').notEmpty().withMessage('Is land use permit verified is required'),
        body('bedrooms').notEmpty().withMessage('Bedrooms is required'),
        body('kitchens').notEmpty().withMessage('Kitchens is required')
    ],
    validate,
    propertyController.updateProperty
);

router.get('/properties',authMiddleware, validate, propertyController.getAllProperty);

router.get('/properties/:page', authMiddleware, validate, propertyController.getPropertiesByPage);

router.get(
    '/property/:id',
    authMiddleware,
    [
        param('id').isMongoId().withMessage('Invalid property ID')
    ],
    validate, 
    propertyController.getPropertyById
);

router.delete(
    '/property/:id',
    authMiddleware,
    [
        param('id').isMongoId().withMessage('Invalid property ID')
    ],
    validate,
    propertyController.deletePropertyById
);

router.get(
    '/review/:property_id',
    authMiddleware,
    [
        param('property_id').isMongoId().withMessage('Invalid property ID')
    ],
    validate,
    propertyController.getAllReviewsFromPropertyId
);

router.get(
    '/review/user/:user_id',
    authMiddleware,
    [
        param('user_id').isMongoId().withMessage('Invalid user ID')
    ],
    validate,
    propertyController.getAllReviewsFromUserID
);

router.post(
    '/review/:property_id',
    authMiddleware,
    [
        param('property_id').isMongoId().withMessage('Invalid property ID'),
        body('rating').notEmpty().withMessage('Rating is required'),
        body('comment').notEmpty().withMessage('Comment is required')
    ],
    validate, 
    propertyController.addReview
);

router.put(
    '/review/:property_id/:id',
    authMiddleware,
    [
        param('property_id').isMongoId().withMessage('Invalid property ID'),
        param('id').isMongoId().withMessage('Invalid review ID'),
        body('rating').notEmpty().withMessage('Rating is required'),
        body('comment').notEmpty().withMessage('Comment is required')
    ],
    validate, 
    propertyController.updateReviewById
);

router.delete(
    '/review/:property_id/:id',
    authMiddleware,
    [
        param('property_id').isMongoId().withMessage('Invalid property ID'),
        param('id').isMongoId().withMessage('Invalid review ID')
    ],
    validate,
    propertyController.deleteReviewById
);

module.exports = router;
