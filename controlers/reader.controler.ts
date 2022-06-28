const expressReader = require("express");
const routerReader = expressReader.Router();
const { getOneReader, insertOneReader } = require("../services/reader.service");
routerReader.get("/:id", getOneReader);
routerReader.post("/", insertOneReader);
module.exports = routerReader;
