import * as express from "express";
import { PublisherValidator } from "../validator/publischer.validator";
const { PublisherEntity } = require("../records/Publisher.record");

exports.getAll = async function (req: express.Request, res: express.Response) {
  const publisherItems = await PublisherEntity.getAll();
  res.status(200).json({
    isSuccess: true,
    publisherItems,
  });
};

exports.insertOne = async function (
  req: express.Request,
  res: express.Response
) {
  const { name } = req.body;

  const { validator } = new PublisherValidator(req.body);

  if (validator.error) {
    return res.json({
      isSuccess: false,
      resultValidation: validator.resultValidation,
    });
  }
  const publisherEntity = new PublisherEntity({ name: name });
  const id = await publisherEntity.insertOne();
  res.json({
    isSuccess: true,
    id: id,
  });
};

exports.getOne = async function (req: express.Request, res: express.Response) {
  const { id } = req.params;
  const [result] = await PublisherEntity.getOne(id);
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
  const publisherEntity = new PublisherEntity({ name: name, id: id });
  const result = await publisherEntity.updateOne();
  res.json({
    isSuccess: true,
    result: result,
  });
};
