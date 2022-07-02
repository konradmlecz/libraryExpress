import { resolve } from "path";
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
const {
  authenticationReader,
  authenticationAdmin,
} = require("../utils/authentification");

// reader authentication
routerReader.post("/signup", signUp);
routerReader.post("/login", loginIn);

// reader book
routerReader.get("/book", authenticationReader, getlendBooks);
routerReader.post("/book", authenticationReader, lendOneBook);
routerReader.delete("/book", authenticationReader, deleteOneBook);

// reader acount

routerReader.get("/", authenticationReader, getOneReader);
routerReader.put("/", authenticationReader, updateOneReader);

module.exports = routerReader;
