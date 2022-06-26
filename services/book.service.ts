import * as express from "express";
const { BookEntity } = require("../records/Book.record");

exports.getAllBook = async function (
  req: express.Request,
  res: express.Response
) {
  const bookItems = await BookEntity.getAll();
  res.status(200).json({
    isSuccess: true,
    bookItems,
  });
};

exports.insertOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { title, description, isLend, publischedAt, publischedId } = req.body;

  const bookEntity = new BookEntity({
    title,
    description,
    isLend,
    publischedAt,
    publischedId,
  });
  const id = await bookEntity.insertOne();
  res.json({
    isSuccess: true,
    id: id,
  });
};

exports.getOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;

  const [result] = await BookEntity.getOne(id);
  res.json({
    isSuccess: true,
    result: result,
  });
};
