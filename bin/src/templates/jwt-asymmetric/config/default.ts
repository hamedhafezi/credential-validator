import dotenv from "dotenv";
dotenv.config();

const { PORT, SUB_PAYLOAD, HEADER_KEY, ALG } = process.env;
module.exports = {
  PORT,
  SUB_PAYLOAD,
  ALG,
  HEADER_KEY,
};
