import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { verify } from "./auth.service";
import { HttpStatus, exceptions } from "./error";

const { InvalidToken, NoTokenProvided } = exceptions;

class Controller {
  async verify(req: Request, res: Response, next: NextFunction) {
    const token = <string>req.headers["x-auth-key"];
    try {
      if (!token) {
        throw new NoTokenProvided();
      }
      await verify(token);
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        next(new InvalidToken());
      } else {
        next(error);
      }
    }
  }
}
export default Controller;
