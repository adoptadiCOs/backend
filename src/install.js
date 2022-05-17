//TODO: this is for testing
// have to change jobs/pets.jobs module exports!! uncomment the line

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const syncro = require("./jobs/pets.job");


mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
  syncro.fetchPets();
});
