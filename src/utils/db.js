const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const DB = process.env.DB || "mongodb://localhost:27017/animaliCOs";

//DB Connection
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

let gfs;

mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("photos");
});

module.exports = {
  gfs,
};
