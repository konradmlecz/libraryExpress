const expressBook = require("express");
const routerBook = expressBook.Router();
const {
  getAllBook,
  getOneBook,
  insertOneBook,
} = require("../services/book.service");
const { authenticationReader } = require("../utils/authentification");
routerBook.get("/", authenticationReader, getAllBook);
routerBook.get("/:id", getOneBook);
routerBook.post("/", insertOneBook);

module.exports = routerBook;
