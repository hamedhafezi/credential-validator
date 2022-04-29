import { HttpStatus } from "./http-status";

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(statusCode: HttpStatus, message: string, isOperational: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
  }
}
export default ApiError;
