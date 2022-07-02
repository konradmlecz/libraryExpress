import * as express from "express";
const { BookEntity } = require("../records/Book.record");
const { BookAuthorEntity } = require("../records/BookAuthor.record");
const { BookValidator } = require("../validator/book.validator");

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
  const { title, description, publischedAt, publisherId, authorId } = req.body;

  const { validator } = await BookValidator.checkForInsertOne(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const bookEntity = new BookEntity({
    title,
    description,
    publischedAt,
    publisherId,
    isLend: 0,
  });
  const bookId = await bookEntity.insertOne();

  const bookAuthorEntity = new BookAuthorEntity({
    authorId,
    bookId,
  });

  await bookAuthorEntity.insertOne();

  res.json({
    isSuccess: true,
    id: bookId,
  });
};

exports.getOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;

  const { validator } = await BookValidator.checkForGetOne({
    id: id,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await BookEntity.getOneById(id);
  res.json({
    isSuccess: true,
    result: result,
  });
};
