const mongoose = require("mongoose");

const DB = process.env.DB || "mongodb://localhost:27017/animaliCOs";

//DB Connection
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

