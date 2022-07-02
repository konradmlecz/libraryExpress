import * as express from "express";

exports.authentication = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("is here");

  next();
};
