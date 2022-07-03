import { resolve } from "path";
const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  insertOne,
  updateOne,
} = require("../services/publisher.service");
const {
  authenticationReader,
  authenticationAdmin,
} = require("../utils/authentification");
router.get("/", authenticationReader, authenticationAdmin, getAll);
router.get("/:id", authenticationReader, authenticationAdmin, getOne);
router.put("/:id", authenticationReader, authenticationAdmin, updateOne);
router.post("/", authenticationReader, authenticationAdmin, insertOne);

module.exports = router;
