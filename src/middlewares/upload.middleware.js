const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const DB = process.env.DB || "mongodb://localhost:27017/animaliCOs";

const storage = new GridFsStorage({
  url: DB,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log("Body del middleware");
    console.log(req.body);

    const filename = req.body.id;

    return {
      filename: filename,
      bucketName: "avatars",
    };
  },
});

module.exports = multer({ storage });
