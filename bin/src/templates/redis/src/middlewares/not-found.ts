import { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendStatus(404);
  return;
};
