import { NextFunction, Request, Response } from "express";
import { verify } from "./auth.service";
import { HttpStatus } from "./error";
import { NoTokenProvided, Unauthorized } from "./error/exceptions";

class Controller {
  async verify(req: Request, res: Response, next: NextFunction) {
    let basicAuthCredentials = { username: "", password: "" };
    if (req.headers.authorization) {
      basicAuthCredentials = getCredentialsFormAuthHeader(req.headers);
    }
    try {
      await verify(
        req.body?.username || basicAuthCredentials.username,
        req.body?.password || basicAuthCredentials.password,
        req.body?.token || req.headers["x-auth-key"]
      );
      res.status(HttpStatus.OK).json({
        success: true,
        statusCode: HttpStatus.OK,
        message: "Successfully loged-in",
      });
    } catch (error) {
      next(new Unauthorized());
    }
  }
}
function getCredentialsFormAuthHeader(headers: any) {
  const b64auth = headers.authorization.split(" ")[1];
  const [username, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  return { username, password };
}

export default Controller;
