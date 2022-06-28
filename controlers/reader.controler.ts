const expressReader = require("express");
const routerReader = expressReader.Router();
const {
  getOneReader,
  insertOneReader,
  updateOneReader,
} = require("../services/reader.service");
routerReader.get("/:id", getOneReader);
routerReader.post("/", insertOneReader);
routerReader.put("/:id", updateOneReader);
module.exports = routerReader;
