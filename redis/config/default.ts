import dotenv from "dotenv";
dotenv.config();

const {
  HOST,
  USER,
  PASSWORD,
  INSTANCE_NUMBER,
  PREFIX_KEY,
  APPEND_DATA,
  PORT,
  REDIS_PORT,
} = process.env;
module.exports = {
  HOST,
  USER,
  PASSWORD,
  INSTANCE_NUMBER,
  PREFIX_KEY,
  APPEND_DATA,
  PORT,
  REDIS_PORT,
};
