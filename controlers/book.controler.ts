const expressBook = require("express");
const routerBook = expressBook.Router();
const {
  getAllBook,
  getOneBook,
  insertOneBook,
} = require("../services/book.service");
const {
  authenticationReader,
  authenticationAdmin,
} = require("../utils/authentification");
routerBook.get("/", authenticationReader, getAllBook);
routerBook.get("/:id", authenticationReader, getOneBook);
routerBook.post("/", authenticationReader, authenticationAdmin, insertOneBook);

module.exports = routerBook;
