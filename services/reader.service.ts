import * as express from "express";
const { ReaderEntity } = require("../records/Reader.record");
const { ReaderBookEntity } = require("../records/ReaderBook.record");
const { ReaderValidator } = require("../validator/reader.validator");
const { ReaderBookValidator } = require("../validator/readerBook.validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  const [result] = await ReaderEntity.getOneById(id);

  res.json({
    isSuccess: true,
    result: result,
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

exports.deleteOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { readerId, bookId } = req.body;

  const { validator } = await ReaderBookValidator.checkDeleteBook(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await ReaderBookEntity.deleteOne(bookId, readerId);

  res.status(200).json({
    isSuccess: true,
    result,
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

exports.signUp = async function (req: express.Request, res: express.Response) {
  const { name, surname, email, phone, password } = req.body;

  const { validator } = await ReaderValidator.checkSignUp(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const readerEntity = new ReaderEntity({
    name,
    surname,
    email,
    phone,
    password: hashedPassword,
  });

  const id = await readerEntity.insertOne();

  res.json({
    isSuccess: true,
    id: id,
  });
};

exports.loginIn = async function (req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  const { validator } = await ReaderValidator.checkLogin(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const token = jwt.sign(
    { email: email, id: validator.entity.id },
    process.env.sk,
    { expiresIn: "1h" },
    { algorithm: "RS256" }
  );
  res.json({
    isSuccess: true,
    token,
  });
};
