const router = require("express").Router();
const controller = require("../controllers/user.controller");

//Login Route
router.post("/login", controller.Login);

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out successfully." });
});

module.exports = router;
