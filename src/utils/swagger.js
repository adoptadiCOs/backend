const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

/**
 * Swagger definition.
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "AdoptadiCOs API",
    description: "This is a REST API that retrieves data from AdoptadiCOs.",
    contact: {
      name: "API Support",
      email: "adoptadicos@gmail.com",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080/api/",
      description: "Development server",
    },
    {
      url: "https://adoptadicos.herokuapp.com/api/",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

/**
 * Options for the swagger docs.
 */
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [path.join(__dirname, "../routes/**/*.js")],
};

/**
 * Initialize swagger-jsdoc.
 */
var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
