const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const packageJson = require('../package.json');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: packageJson.name.toUpperCase() || 'diploma-back',
      description: packageJson.description || 'mon diploma',
      version: packageJson.version || '1.0.0',
      contact: {
        name: packageJson.author || 'Unknown Author',
        email: packageJson.email || 'author@example.com',
      },
      license: {
        name: packageJson.license || 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/diploma/api',
      },
      {
        url: 'https://diploma.edu.gov.kg/diploma/api',
      },
    ],
    tags: [
      {
        name: 'Diploma',
        description: 'Endpoints related to diploma data',
      },
      {
        name: 'Shared',
        description: 'Endpoints related to shared data',
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
  apis: [
    path.join(__dirname, '../shared/sharedRoute.js'),
    // path.join(__dirname, '../diploma/diplomaRoute.js'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
