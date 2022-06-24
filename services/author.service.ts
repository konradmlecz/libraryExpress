import * as express from "express";
const { AuthorEntity } = require("../records/Author.record");

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
