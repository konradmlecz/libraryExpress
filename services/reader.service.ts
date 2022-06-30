import * as express from "express";
const { ReaderEntity } = require("../records/Reader.record");
const { ReaderBookEntity } = require("../records/ReaderBook.record");
const { ReaderValidator } = require("../validator/reader.validator");
const { ReaderBookValidator } = require("../validator/readerBook.validator");

exports.getOneReader = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;

  const { validator } = await ReaderValidator.checkForGeteOne({
    id: id,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await ReaderEntity.getOne(id);

  res.json({
    isSuccess: true,
    result: result,
  });
};

exports.insertOneReader = async function (
  req: express.Request,
  res: express.Response
) {
  const { name, surname, email, phone } = req.body;

  const { validator } = await ReaderBookValidator.checkForInsertOne(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const readerEntity = new ReaderEntity({ name, surname, email, phone });
  const id = await readerEntity.insertOne();

  res.json({
    isSuccess: true,
    id: id,
  });
};

exports.updateOneReader = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;
  const { name, surname, phone } = req.body;

  const { validator } = await ReaderValidator.checkForUbdateOne({
    id: id,
    name: name,
    surname: surname,
    phone: phone,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const readerEntity = new ReaderEntity({
    name: name,
    surname: surname,
    phone: phone,
    id: id,
  });
  const result = await readerEntity.updateOne();
  res.json({
    isSuccess: true,
    result: result,
  });
};

exports.lendOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { readerId, bookId } = req.body;

  const { validator } = await ReaderBookValidator.checkLendOneBook(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const readerBookEntity = new ReaderBookEntity({ readerId, bookId });
  const id = await readerBookEntity.insertOne();

  res.json({
    isSuccess: true,
    id: id,
  });
};

exports.getlendBooks = async function (
  req: express.Request,
  res: express.Response
) {
  const { readerId } = req.body;

  const { validator } = await ReaderBookValidator.checkGetAll(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await ReaderBookEntity.getAll(readerId);

  res.status(200).json({
    isSuccess: true,
    result,
  });
};
