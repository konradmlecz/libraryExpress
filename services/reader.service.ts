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
  const { id } = res.locals.reader;

  const validator = await ReaderValidator.checkForGeteOne({
    id: id,
  });
  console.log(validator);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await ReaderEntity.getOneById(id);

  res.json({
    isSuccess: true,
    message: "Reader data..",
    result: result,
  });
};

exports.updateOneReader = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = res.locals.reader;
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
  await readerEntity.updateOne();
  res.json({
    isSuccess: true,
    message: "Reader data is ubdated",
  });
};

exports.lendOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { id: readerId } = res.locals.reader;

  const { bookId } = req.body;

  const { validator } = await ReaderBookValidator.checkLendOneBook({
    readerId,
    bookId,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const readerBookEntity = new ReaderBookEntity({ readerId, bookId });
  await readerBookEntity.insertOne();
  res.json({
    isSuccess: true,
    message: "book was lend",
  });
};

exports.deleteOneBook = async function (
  req: express.Request,
  res: express.Response
) {
  const { id: readerId } = res.locals.reader;

  const { bookId } = req.body;

  const { validator } = await ReaderBookValidator.checkDeleteBook({
    readerId,
    bookId,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  await ReaderBookEntity.deleteOne(bookId, readerId);

  res.status(200).json({
    isSuccess: true,
    message: "book was return",
  });
};

exports.getlendBooks = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = res.locals.reader;
  const { validator } = await ReaderBookValidator.checkGetAll({ readerId: id });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await ReaderBookEntity.getAll(id);

  res.status(200).json({
    isSuccess: true,
    message: "List books...",
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

  res.status(201).json({
    isSuccess: true,
    message: "Reader is created",
    id: id,
  });
};

exports.loginIn = async function (req: express.Request, res: express.Response) {
  const { email } = req.body;

  const { validator, entity } = await ReaderValidator.checkLogin(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const token = jwt.sign(
    { email: email, id: entity.id },
    process.env.sk,
    { expiresIn: "6h" },
    { algorithm: "RS256" }
  );
  res.json({
    isSuccess: true,
    message: "Reader is login",
    token,
  });
};
