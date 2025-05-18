const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GamerMatch API',
      version: '1.0.0',
      description: 'Documentación de la API RESTful de GamerMatch'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.js'], // Asegúrate de que la ruta es correcta
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
