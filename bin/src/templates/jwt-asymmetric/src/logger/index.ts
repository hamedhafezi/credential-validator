import winston from "winston";

const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
export default logger;
