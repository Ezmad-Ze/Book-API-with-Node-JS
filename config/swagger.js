const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Reading Tracker API",
      description:
        "This is a custom API that let a reader handle which book they have read, about to read or have read",
      version: "1.0.0",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "jwt",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/auth/*.js", "./routes/books/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  //Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //Docs in json format
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
