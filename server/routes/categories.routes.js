const express = require("express");
const { auth } = require("../middleware/auth");
const {
  createCategories,
  categoriesGet,
} = require("../controllers/categories.controller");

const router = express.Router();

router.get("/", auth, categoriesGet);
router.post("/", auth, createCategories);
module.exports = router;
