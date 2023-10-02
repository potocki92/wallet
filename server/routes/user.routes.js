const express = require("express");
const { auth } = require("../middleware/auth");
const {
  signup,
  signin,
  logout,
  current,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
module.exports = router;
