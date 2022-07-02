const expressBook = require("express");
const routerBook = expressBook.Router();
const {
  getAllBook,
  getOneBook,
  insertOneBook,
} = require("../services/book.service");
const { authentication } = require("../utils/authentification");
routerBook.get("/", authentication, getAllBook);
routerBook.get("/:id", getOneBook);
routerBook.post("/", insertOneBook);

module.exports = routerBook;
