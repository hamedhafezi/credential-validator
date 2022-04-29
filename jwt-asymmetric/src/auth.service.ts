import jwt, { Algorithm } from "jsonwebtoken";
import fs from "fs";
import path from "path";
import config from "config";

const sub: string = config.get("SUB");
const alg: Algorithm = config.get("ALG");

export async function verify(token: string) {
  const cert = fs.readFileSync(path.resolve(__dirname, "public.pem"));
  return jwt.verify(token, cert, {
    algorithms: [alg],
    subject: sub,
  });
}
