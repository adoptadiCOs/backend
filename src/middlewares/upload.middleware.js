const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const DB = process.env.DB || "mongodb://localhost:27017/animaliCOs";

const storage = new GridFsStorage({
  url: DB,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
});

module.exports = multer({ storage });
