const expressReader = require("express");
const routerReader = expressReader.Router();
const {
  getOneReader,
  updateOneReader,
  lendOneBook,
  getlendBooks,
  deleteOneBook,
  signUp,
  loginIn,
} = require("../services/reader.service");
routerReader.post("/signup", signUp);
routerReader.post("/login", loginIn);
routerReader.get("/book", getlendBooks);
routerReader.post("/book", lendOneBook);
routerReader.delete("/book", deleteOneBook);
routerReader.get("/:id", getOneReader);
routerReader.put("/:id", updateOneReader);
module.exports = routerReader;
