const awaggerJSDoc = require('swagger-jsdoc')


const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Anastasia API',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
        
      }, {
        url: process.env.PUBLIC_URI
      }
    ]
  },
  apis: ["./routing/*.js"]
}

exports.swaggerSpec = awaggerJSDoc(options)