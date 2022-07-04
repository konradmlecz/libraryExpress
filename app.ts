require("dotenv").config();
import * as express from "express";
import "express-async-errors";
import { urlencoded } from "express";
import "./utils/db";
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
  res.send("ok");
});

app.listen(3000);
