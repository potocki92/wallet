const express = require("express");
const { auth } = require("../middleware/auth");
const {
  transactionGet,
  createTransaction,
} = require("../controllers/transactions.controller");

const router = express.Router();

router.get("/", transactionGet);
router.get("/:id");
router.post("/", auth, createTransaction);
router.put("/:id");
router.delete("/:id");
router.get("/stats/:year/:month");
router.get("/stats/balance");
module.exports = router;
