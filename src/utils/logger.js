const morgan = require("morgan");
const fs = require("node:fs");
const path = require("node:path");

module.exports = (app) => {
  // Log 4xx and 5xx responses to console
  app.use(
    morgan("dev", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );

  // Log all requests to access.log
  app.use(
    morgan("common", {
      stream: fs.createWriteStream(
        path.join(__dirname, "../../logs/access.log"),
        {
          flags: "a",
        }
      ),
    })
  );
};
