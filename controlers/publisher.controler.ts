const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  insertOne,
  updateOne,
} = require("../services/publisher.service");
const {
  authenticationReader: ar,
  authenticationAdmin: aa,
} = require("../utils/authentification");
router.get("/", ar, aa, getAll);
router.get("/:id", ar, aa, getOne);
router.put("/:id", ar, aa, updateOne);
router.post("/", ar, aa, insertOne);

module.exports = router;
