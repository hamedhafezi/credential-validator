import ApiError from "./api-error";
import { HttpStatus } from "./http-status";

export class NoKeyProvided extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, "No key provided", true);
  }
}

export class InvalidKey extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, "Key is not valid", true);
  }
}
