import * as express from "express";
const jwt = require("jsonwebtoken");

exports.authentication = async function (
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
