const expressAuthor = require("express");
const routerAuthor = expressAuthor.Router();
const {
  getAllAuthor,
  getOneAuthor,
  insertOneAuthor,
  updateOneAuthor,
} = require("../services/author.service");
routerAuthor.get("/", getAllAuthor);
routerAuthor.get("/:id", getOneAuthor);
routerAuthor.put("/:id", updateOneAuthor);
routerAuthor.post("/", insertOneAuthor);

module.exports = routerAuthor;
