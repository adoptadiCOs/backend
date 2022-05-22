require("./utils/env");
require("./utils/db");
require("./utils/jobs");
require("./utils/passport");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const swaggerSpec = require("./utils/swagger");

const app = express();

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api", routes);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ error: `El método ${req.method} ${req.url} no esta definido` });
});

// Starting server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
