import { resolve } from "path";

const expressAuthor = require("express");
const routerAuthor = expressAuthor.Router();
const {
  getAllAuthor,
  getOneAuthor,
  insertOneAuthor,
  updateOneAuthor,
} = require("../services/author.service");
const {
  authenticationReader,
  authenticationAdmin,
} = require("../utils/authentification");
routerAuthor.get("/", authenticationReader, authenticationAdmin, getAllAuthor);
routerAuthor.get(
  "/:id",
  authenticationReader,
  authenticationAdmin,
  getOneAuthor
);
routerAuthor.put(
  "/:id",
  authenticationReader,
  authenticationAdmin,
  updateOneAuthor
);
routerAuthor.post(
  "/",
  authenticationReader,
  authenticationAdmin,
  insertOneAuthor
);

module.exports = routerAuthor;
