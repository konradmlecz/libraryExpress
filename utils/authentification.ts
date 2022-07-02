import * as express from "express";
const { ReaderEntity } = require("../records/Reader.record");
const jwt = require("jsonwebtoken");

exports.authenticationReader = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;

  jwt.verify(
    authHeader,
    process.env.sk,
    { algorithm: "RS256" },
    function (err: any, decoded: any) {
      if (err) {
        return res.status(403).json({
          massage: "authentication failed",
          isSuccess: false,
        });
      }
      res.locals.reader = decoded;
      next();
    }
  );
};

exports.authenticationAdmin = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (res.locals?.reader) {
    const [result] = await ReaderEntity.getRoleById(res.locals.reader.id);
    if (result && result.role === "ADMIN") {
      next();
    } else {
      return res.status(401).json({
        massage: "You are Reader and not have authentication",
        isSuccess: false,
      });
    }
  } else {
    return res.status(401).json({
      massage: "You are not authentication",
      isSuccess: false,
    });
  }
};
