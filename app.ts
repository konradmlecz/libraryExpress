require("dotenv").config();
import * as express from "express";
import "express-async-errors";
import { urlencoded } from "express";
import "./utils/db";
import e = require("express");
const publisherRouter = require("./controlers/publisher.controler");
const authorRouter = require("./controlers/author.controler");
const bookRouter = require("./controlers/book.controler");
const readerRouter = require("./controlers/reader.controler");
const app = express();

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use("/publisher", publisherRouter);
app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/reader", readerRouter);

app.use("/", (req, res) => {
  res.send(
    "Welcome in API for Library, Please signup acount on https://api.konradmleczko85.smallhost.pl/reader/signup"
  );
});

app.use(
  (
    err: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send("Sorry something went wrong, try again later");
  }
);

app.listen(3000);
