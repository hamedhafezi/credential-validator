import config from "config";
import { NextFunction, Request, Response } from "express";
import { verify } from "./auth.service";
import { HttpStatus, exceptions } from "./error";

const { InvalidKey, NoKeyProvided } = exceptions;
const appendData: boolean = config.get("APPEND_DATA");

class Controller {
  async verify(req: Request, res: Response, next: NextFunction) {
    const key: string | undefined = <string>req.headers["x-api-key"];
    try {
      if (!key) {
        throw new NoKeyProvided();
      }
      const data = await verify(key);
      if (!data) {
        throw new InvalidKey();
      }
      if (appendData) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.sendStatus(HttpStatus.OK);
      }
    } catch (error) {
      next(error);
    }
  }
}
export default Controller;
