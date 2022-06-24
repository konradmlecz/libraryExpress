const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  insertOne,
  updateOne,
} = require("../services/publisher.service");
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", updateOne);
router.post("/", insertOne);

module.exports = router;
