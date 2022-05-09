require("./utils/env");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");

const swaggerSpec = require("./utils/swagger");

const app = express();

//Configurations
const PORT = process.env.PORT || 8080;
const DB = process.env.DB || "mongodb://localhost:27017/animaliCOs";

// Logging
app.use(morgan("dev"));

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", router);

//app.use('/account',public_account)
//app.use('/chat',public_chat)
//.....

//DB Connection
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

//Jobs

const sync = require("./jobs/pets.job");

sync.start();

// Starting server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
