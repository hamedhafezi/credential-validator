import dotenv from "dotenv";
dotenv.config();

const { PORT, SECRET_KEY, SUB_PAYLOAD, ALG, HEADER_KEY } = process.env;
module.exports = {
  PORT,
  SECRET_KEY,
  SUB_PAYLOAD,
  ALG,
  HEADER_KEY,
};
