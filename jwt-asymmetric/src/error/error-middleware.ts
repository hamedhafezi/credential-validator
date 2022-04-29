import { NextFunction, Request, Response } from "express";
import ApiError from "../error/api-error";
import logger from "../logger";

export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isOperational) {
    const { statusCode, message } = err;
    res.status(statusCode).send({
      error: true,
      statusCode,
      message,
    });
  } else {
    res.sendStatus(500);
    logger.error(err.message);
    process.exit(1);
  }
};
