import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions = {
        swaggerDefinition: {
          openapi: '3.0.0',
          info: {
            title: 'Candidate API',
            version: '1.0.0',
            description: 'API Documentation for Candidate and Index Routes',
          },
          servers: [
            {
              url: 'http://localhost:3000',
            },
          ],
        },
        apis: ['./routes/*.js'], // Path to the API docs
      
}

export default swaggerOptions;