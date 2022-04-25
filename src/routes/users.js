const Router = require("express");

const router = Router();

/* Create user */
router.post("/", (_, res) => {
  res.send("Create user route");
});

/* Logs user into the system */
router.get("/login", (_, res) => {
  res.send("Login route");
});

/* Logs out the current user  */
router.get("/logout", (_, res) => {
  res.send("Logout route");
});

/* Delete user */
router.get("/:username", (_, res) => {
  res.send("Delete user route");
});

module.exports = router;
