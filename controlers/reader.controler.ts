const expressReader = require("express");
const routerReader = expressReader.Router();
const {
  getOneReader,
  insertOneReader,
  updateOneReader,
  lendOneBook,
  getlendBooks,
} = require("../services/reader.service");
routerReader.get("/book", getlendBooks);
routerReader.post("/book", lendOneBook);
routerReader.get("/:id", getOneReader);
routerReader.post("/", insertOneReader);
routerReader.put("/:id", updateOneReader);
module.exports = routerReader;
