const expressReader = require("express");
const routerReader = expressReader.Router();
const { getOneReader, insertOneReader } = require("../services/reader.service");
routerReader.get("/:id", getOneReader);

module.exports = routerReader;
