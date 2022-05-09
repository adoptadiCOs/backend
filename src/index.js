require("./utils/env");
require("./utils/db");
require("./utils/jobs")

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const router = require("./routes");
const swaggerSpec = require("./utils/swagger");

const app = express();

const PORT = process.env.PORT || 8080;

// Logging
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api", router);

// Starting server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
