const express = require('express')
const router = express.Router()

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST - Swagger',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
      contact: {
        email: 'contact@danielpecos.com'
      }
    },
    tags: [
      {
        name: 'stocks',
        description: 'Stocks API'
      }
    ],
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/api'
  },
  apis: ['./api/controllers/stocks.js', './api/models/stock-model.js']
}

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = swaggerJSDoc(options)

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router
