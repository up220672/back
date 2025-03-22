
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quick Trips API',
      version: '1.0.0',
      description: 'API for Quick Trips',
      contact: {
        name: 'UP220672 - UP220733 -UP220310 -UP220249',
      },
    },
    //personalizacion de orden de routes
    tags: [
      { name: 'Auth' },
      { name: 'User' },
      { name: 'Review' }, 
      { name: 'Property' },
      { name: 'Payment' },
      { name: 'Booking' }
    ],  servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || 'http://localhost:3000/api',
      },
    ],
    components: {

      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/models/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;