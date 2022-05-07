import ApiError from "./api-error";
import { HttpStatus } from "./http-status";

export class NoTokenProvided extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, "No token provided", true);
  }
}

export class InvalidToken extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, "Token is not valid", true);
  }
}
