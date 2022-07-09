import * as express from "express";
import { PublisherValidator } from "../validator/publischer.validator";
const { PublisherEntity } = require("../records/Publisher.record");

exports.getAll = async function (req: express.Request, res: express.Response) {
  const publisherItems = await PublisherEntity.getAll();
  res.status(200).json({
    isSuccess: true,
    message: "List of Publishers",
    publisherItems,
  });
};

exports.insertOne = async function (
  req: express.Request,
  res: express.Response
) {
  const { name } = req.body;

  const { validator } = PublisherValidator.checkForInsertOne(req.body);

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }
  const publisherEntity = new PublisherEntity({ name: name });
  const id = await publisherEntity.insertOne();
  res.json({
    isSuccess: true,
    message: "Publisher added",
    id: id,
  });
};

exports.getOne = async function (req: express.Request, res: express.Response) {
  const { id } = req.params;

  const { validator } = await PublisherValidator.checkForGeteOne({
    id: id,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      message: "Publisher..",
      resultValidation: validator.resultValidation,
    });
  }

  const [result] = await PublisherEntity.getOneById(id);

  res.json({
    isSuccess: true,
    result: result,
  });
};

exports.updateOne = async function (
  req: express.Request,
  res: express.Response
) {
  const { id } = req.params;
  const { name } = req.body;

  const { validator } = await PublisherValidator.checkForUbdateOne({
    id: id,
    name: name,
  });

  if (validator.error) {
    return res.status(400).json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }

  const publisherEntity = new PublisherEntity({ name: name, id: id });
  const result = await publisherEntity.updateOne();
  res.json({
    isSuccess: true,
    message: "Publisher ubdated",
    result: result,
  });
};
