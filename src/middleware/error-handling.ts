import { Request, Response, NextFunction } from "express";
import { ApiException } from "../exceptions/api.exception";

export const errorHandling = async (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiException) {
    res.status(err.status).send(err.message);
  }
  next();
};
