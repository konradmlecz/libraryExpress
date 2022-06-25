import * as express from "express";
const { AuthorEntity } = require("../records/Author.record");
const { AuthorValidator } = require("../validator/author.validator");

exports.getAllAuthor = async function (
  req: express.Request,
  res: express.Response
) {
  const authorItems = await AuthorEntity.getAll();
  res.status(200).json({
    isSuccess: true,
    authorItems,
  });
};

exports.insertOneAuthor = async function (
  req: express.Request,
  res: express.Response
) {
  const { name, surname } = req.body;
  const { validator } = AuthorValidator.checkForInsertOne(req.body);

  if (validator.error) {
    return res.json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const publisherEntity = new AuthorEntity({ name: name, surname: surname });
  const id = await publisherEntity.insertOne();
  res.json({
    isSuccess: true,
    id: id,
  });
};

exports.getOneAuthor = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;

  const { validator } = await AuthorValidator.checkForGeteOne({
    id: id,
  });

  if (validator.error) {
    return res.json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await AuthorEntity.getOne(id);
  res.json({
    isSuccess: true,
    result: result,
  });
};

exports.updateOneAuthor = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;
  const { name, surname } = req.body;

  const { validator } = await AuthorValidator.checkForUbdateOne({
    id: id,
    name: name,
    surname: surname,
  });

  if (validator.error) {
    return res.json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const authorEntity = new AuthorEntity({
    name: name,
    surname: surname,
    id: id,
  });
  const result = await authorEntity.updateOne();
  res.json({
    isSuccess: true,
    result: result,
  });
};
