import config from "config";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { InvalidToken, NoTokenProvided } from "./error/exceptions";
import { verify } from "./auth.service";

const headerKey: string = config.get("HEADER_KEY");

class Controller {
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header(headerKey);
      if (!token) {
        throw new NoTokenProvided();
      }
      await verify(token);
      res.sendStatus(200);
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        next(new InvalidToken());
      } else {
        next(error);
      }
    }
  }
}
export default Controller;
