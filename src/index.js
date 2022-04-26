const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./utils/swagger");

const app = express();

//Configurations
dotenv.config();
const PORT = process.env.PORT || 8080;
const DB = process.env.DB || "mongodb://localhost:27017/animaliCOs";

// Logging
app.use(morgan("dev"));
// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Import Routes
const routes = require("./routes");
const public_pets = require("./routes/pets/public");
const private_pets = require("./routes/pets/private");
const public_statistics = require("./routes/statistics/public");

//Import Middlewares

const { AuthMiddleware } = require("./middlewares/auth.middleware");

//Middlewares
app.use(cors());
app.use(express.json());

//TODO: private routes must have AuthMiddleware before the router
app.use("/api", routes);
app.use("/api", public_pets);
app.use("/api", AuthMiddleware, private_pets);
app.use("/api", public_statistics);

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
