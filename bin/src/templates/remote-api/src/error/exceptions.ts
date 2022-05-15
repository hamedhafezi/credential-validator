import ApiError from "./api-error";
import { HttpStatus } from "./http-status";

export class NoTokenProvided extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, "No token provided", true);
  }
}
export class Unauthorized extends ApiError {
  constructor() {
    super(HttpStatus.Unauthorized, "Unauthorized", true);
  }
}
export class InvalidToken extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, "Token is not valid", true);
  }
}
export class InvalidENV extends ApiError {
  constructor(message: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Enviroment variables error: " + message,
      false
    );
  }
}
