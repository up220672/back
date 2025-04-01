const Property = require('../models/property').Property;

// Agregar nueva propiedad
/**
 * @swagger
 * /property:
 *   post:
 *     summary: Add a new property
 *     tags: [Property]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.addNewProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar propiedad por ID
/**
 * @swagger
 * /property/{id}:
 *   put:
 *     summary: Update a property by ID
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.status(200).send(property);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las propiedades
/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Property]
 *     responses:
 *       200:
 *         description: List of all properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getAllProperty = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).send(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las propiedades por página
/**
 * @swagger
 * /properties/{page}:
 *   get:
 *     summary: Get properties by page
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number
 *     responses:
 *       200:
 *         description: Properties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.getPropertiesByPage = async (req, res) => {
  const page = req.params.page;
  const limit = 10; // cantidad de properties por página

  try {
    const properties = await Property.find({ is_active: true })
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(properties);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Obtener una propiedad por ID
/**
 * @swagger
 * /property/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *     responses:
 *       200:
 *         description: Property retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.status(200).send(property);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una propiedad por ID
/**
 * @swagger
 * /property/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
exports.deletePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.status(200).send({ message: 'Property deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Agregar una nueva reseña a una propiedad
/**
 * @swagger
 * /review/{property_id}:
 *   post:
 *     summary: Add a new review to a property
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: property_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
exports.addReview = async (req, res) => {
  try {
    const property = await Property.findById(req.params.property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.reviews.push(req.body);
    await property.save();
    res.status(201).send(property.reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una reseña por ID
/**
 * @swagger
 * /review/{property_id}/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: property_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
exports.updateReviewById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const review = property.reviews.id(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    Object.assign(review, req.body);
    await property.save();
    res.status(200).send(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una reseña por ID
/**
 * @swagger
 * /review/{property_id}/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: property_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
exports.deleteReviewById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const review = property.reviews.id(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove the review using splice
    property.reviews.splice(property.reviews.indexOf(review), 1);
    await property.save();
    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las reseñas de una propiedad por ID de propiedad
/**
 * @swagger
 * /review/{property_id}:
 *   get:
 *     summary: Get all reviews from a property by property ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: property_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the property
 *     responses:
 *       200:
 *         description: List of all reviews from the property
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
exports.getAllReviewsFromPropertyId = async (req, res) => {
  try {
    const property = await Property.findById(req.params.property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).send(property.reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const mongoose = require('mongoose');

exports.getAllReviewsFromUserID = async (req, res) => {
  try {
    // Validar el user_id
    if (!req.params.user_id || !mongoose.Types.ObjectId.isValid(req.params.user_id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Buscar propiedades con reseñas del usuario
    const properties = await Property.find({
      "reviews.user_id": new mongoose.Types.ObjectId(req.params.user_id)
    });

    // Extraer y filtrar las reseñas
    const userReviews = properties.flatMap(property => 
      property.reviews.filter(review => 
        review.user_id && review.user_id.toString() === req.params.user_id
      )
    );

    // Siempre devolver un array, aunque esté vacío
    res.status(200).json({ success: true, reviews: userReviews });
    
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
};