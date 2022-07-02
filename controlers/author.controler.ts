const expressAuthor = require("express");
const routerAuthor = expressAuthor.Router();
const {
  getAllAuthor,
  getOneAuthor,
  insertOneAuthor,
  updateOneAuthor,
} = require("../services/author.service");
const {
  authenticationReader: R,
  authenticationAdmin: A,
} = require("../utils/authentification");
routerAuthor.get("/", R, A, getAllAuthor);
routerAuthor.get("/:id", R, A, getOneAuthor);
routerAuthor.put("/:id", R, A, updateOneAuthor);
routerAuthor.post("/", R, A, insertOneAuthor);

module.exports = routerAuthor;
