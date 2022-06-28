import * as express from "express";
const { ReaderEntity } = require("../records/Reader.record");
const { ReaderValidator } = require("../validator/reader.validator");

exports.getOneReader = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;

  const { validator } = await ReaderValidator.checkForGeteOne({
    id: id,
  });

  if (validator.error) {
    return res.json({
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

  const { validator } = await ReaderValidator.checkForInsertOne(req.body);

  if (validator.error) {
    return res.json({
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
