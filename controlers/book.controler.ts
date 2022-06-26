const expressBook = require("express");
const routerBook = expressBook.Router();
const {
  getAllBook,
  getOneBook,
  insertOneBook,
} = require("../services/book.service");
routerBook.get("/", getAllBook);
routerBook.get("/:id", getOneBook);
routerBook.post("/", insertOneBook);

module.exports = routerBook;
