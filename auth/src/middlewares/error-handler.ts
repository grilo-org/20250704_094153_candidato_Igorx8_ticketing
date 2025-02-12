import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction // needs to be here to be recognized as a middleware on express
) => {
  console.log("entrou no middleware");
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res
    .status(500)
    .send({ errors: [{ message: "Internal server error" }] });
};
