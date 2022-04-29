import config from "config";
import http from "http";
import app from "./app";
import logger from "./logger";
import { redisInit } from "./redis";

const PORT = config.get("PORT");

let server: http.Server;
function runServer() {
  server = app.listen(PORT, onServerStart);
}
function onServerStart() {
  logger.info(`Server is running on port ${PORT}...`, {
    label: "Server startup",
  });
  console.log(`Server is running on port ${PORT}...`);
}
function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info("Server closed").end();
      logger.on("end", () => {
        process.exit(1);
      });
    });
  } else {
    process.exit(1);
  }
}
function handleError(error: Error, origin: NodeJS.UncaughtExceptionOrigin) {
  logger.error(error.message, { label: origin });
  exitHandler();
}
process.on("uncaughtException", handleError);
process.on("unhandledRejection", handleError);
const start = async () => {
  await redisInit();
  runServer();
};
start();
