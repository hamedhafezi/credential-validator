import { HttpStatus } from "./http-status";
import ApiError from "./api-error";
import * as exceptions from "./exceptions";
import { errorMiddleware } from "./error-middleware";

const error = {
  HttpStatus,
  ApiError,
  exceptions,
  errorMiddleware,
};
export { HttpStatus, ApiError, exceptions, errorMiddleware };
export default error;
