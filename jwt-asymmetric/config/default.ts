import dotenv from "dotenv";
dotenv.config();

const { PORT, SUB, ALG } = process.env;
module.exports = {
  PORT,
  SUB,
  ALG,
};
