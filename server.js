require('dotenv').config();
require('./config/database');

const express = require('express');
const PORT = process.env.PORT || 2653;
const app = express();

const bookRouter = require('./routes/book');


app.use(express.json());


const swaggerJsdoc = require("swagger-jsdoc");
const swagger_UI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Book Management Documentation",
      version: '1.0.0',
      description: "Documentation for a comprehensive API for managing a book collection",
      license: {
        name: "",
      },
      contact: {
        name: "Backend Repo",
        url: ""
      }
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ BearerAuth: [] }]

  },
  apis: ["./routes/*.js"] // Ensure this points to the correct path
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/documentation", swagger_UI.serve, swagger_UI.setup(openapiSpecification));

app.use('/v1', bookRouter);


app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});