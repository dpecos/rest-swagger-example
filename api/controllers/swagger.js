import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerModelValidator from 'swagger-model-validator';

export const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST - Swagger',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
      contact: {
        email: 'contact@danielpecos.com',
      },
    },
    tags: [
      {
        name: 'stocks',
        description: 'Stocks API',
      },
    ],
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/api',
  },
  apis: ['./api/controllers/stocks.js', './api/models/stock-model.js'],
};

const swaggerSpec = swaggerJSDoc(options);
swaggerModelValidator(swaggerSpec);

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error(`Model doesn't match Swagger contract`);
  }
}
